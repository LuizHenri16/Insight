"use client"

import { Input } from "@/components/ui/input"
import MultiSelect from "../multiSelect"
import Select from "../select"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { EmpresaForm } from "@/utils/types/Empresa"
import { update } from "@/lib/utils/update"
import { select } from "@/lib/utils/select"
import { getRatingCredito } from "@/lib/utils/ratingcredito"
import { RatingCredito } from "@/utils/types/ratingcredito"
import { Investimento } from "@/utils/types/investimento"
import { ProdutoServico } from "@/utils/types/produtoservico"
import { getProdutoServico } from "@/lib/utils/produtoservico"
import { getInvestimento } from "@/lib/utils/investimento"
import { useRouter } from "next/navigation"

export const EditForm = ({ id }: { id: number | string }) => {

    const router = useRouter();
    const [ratingCredito, setRatingCredito] = useState<RatingCredito[]>([]);
    const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
    const [produtosServicos, setProdutosServicos] = useState<ProdutoServico[]>([]);

    useEffect(() => {
        getRatingCredito().then((data) => setRatingCredito(data));
        getInvestimento().then((data) => setInvestimentos(data));
        getProdutoServico().then((data) => setProdutosServicos(data));
    }, []);

    const [formData, setFormData] = useState<EmpresaForm>({
        nome_empresa: "",
        cnpj_empresa: "",
        conta: "",
        telefone: "",
        email: "",
        crot: "",
        Socio: [
            { nome_socio: "", cpfcnpj_socio: "" },
            { nome_socio: "", cpfcnpj_socio: "" }
        ],
        Investimentos: [],
        ProdutosServicos: [],
        RatingCredito: "",
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const getEmpresa = async () => {
        try {
            setFetching(true);
            const empresa = await select(id);

            const sociosMapeados = (empresa.EmpresaSocio || [])
                .map((es: any) => es.Socio)
                .slice(0, 2);

            while (sociosMapeados.length < 2) {
                sociosMapeados.push({ nome_socio: "", cpfcnpj_socio: "" });
            }

            const empresaFormatada: EmpresaForm = {
                id_empresa: empresa.id_empresa,
                nome_empresa: empresa.nome_empresa || "",
                cnpj_empresa: empresa.cnpj_empresa || "",
                conta: empresa.conta || "",
                telefone: empresa.telefone || "",
                email: empresa.email || "",
                crot: empresa.crot || "",
                Socio: sociosMapeados,
                Investimentos: (empresa.EmpresaInvestimento || []).map((ei: any) => ({
                    id_investimento: ei.Investimento.id_investimento,
                    nome_investimento: ei.Investimento.investimento
                })),
                ProdutosServicos: (empresa.ProdutosServicosEmpresa || []).map((pse: any) => ({
                    id_produto_servico: pse.ProdutosServicos.id_produtos_servicos,
                    nome_produto_servico: pse.ProdutosServicos.produto_servico
                })),
                RatingCredito: empresa.id_rating_credito?.toString() || ""
            };

            setFormData(empresaFormatada);
        } catch (error) {
            console.error("Erro ao buscar dados da empresa:", error);
            alert("Erro ao carregar dados para edição.");
        } finally {
            setFetching(false);
        }
    }

    useEffect(() => {
        if (id) {
            getEmpresa();
        }
    }, [id]);

    const updateSocio = (index: number, field: 'nome_socio' | 'cpfcnpj_socio', value: string) => {
        const newSocios = [...formData.Socio];
        if (!newSocios[index]) newSocios[index] = { nome_socio: "", cpfcnpj_socio: "" };
        newSocios[index][field] = value;
        setFormData({ ...formData, Socio: newSocios });
    };

    async function handleSubmit() {
        if (!formData.nome_empresa || !formData.cnpj_empresa || !formData.conta) {
            alert("Preencha os campos obrigatórios: Nome, CNPJ e Conta.");
            return;
        }

        const empresaIdNumber = typeof id === 'string' ? parseInt(id) : id;

        setLoading(true);
        try {
            if (await update(empresaIdNumber, formData)) {
                alert("Empresa atualizada com sucesso!");
                router.refresh();
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Erro ao salvar os dados.");
        } finally {
            setLoading(false);
        }
    }

    if (fetching) {
        return <div className="p-4">Carregando dados...</div>;
    }

    return (
        <div>
            <form className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-200">
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="nome_empresa">Nome da empresa</label>
                        <Input id="nome_empresa" type="text" placeholder="Digite o nome da empresa" value={formData.nome_empresa} onChange={(e) => setFormData({ ...formData, nome_empresa: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="cnpj_empresa">CNPJ</label>
                        <Input id="cnpj_empresa" type="text" placeholder="Digite o CNPJ" value={formData.cnpj_empresa} onChange={(e) => setFormData({ ...formData, cnpj_empresa: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="conta">Conta</label>
                        <Input id="conta" type="text" placeholder="Digite o número da conta" value={formData.conta} onChange={(e) => setFormData({ ...formData, conta: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="socio1_nome">Sócio 1</label>
                        <Input id="socio1_nome" type="text" placeholder="Digite o nome do sócio 1" value={formData.Socio[0]?.nome_socio || ""} onChange={(e) => updateSocio(0, "nome_socio", e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="socio1_cpf">CPF/CNPJ 1</label>
                        <Input id="socio1_cpf" type="text" placeholder="Digite o CPF/CNPJ do sócio 1" value={formData.Socio[0]?.cpfcnpj_socio || ""} onChange={(e) => updateSocio(0, "cpfcnpj_socio", e.target.value)} />
                    </div>

                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="socio2_nome">Sócio 2</label>
                        <Input id="socio2_nome" type="text" placeholder="Digite o nome do sócio 2" value={formData.Socio[1]?.nome_socio || ""} onChange={(e) => updateSocio(1, "nome_socio", e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="socio2_cpf">CPF/CNPJ 2</label>
                        <Input id="socio2_cpf" type="text" placeholder="Digite o CPF/CNPJ do sócio 2" value={formData.Socio[1]?.cpfcnpj_socio || ""} onChange={(e) => updateSocio(1, "cpfcnpj_socio", e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="telefone">Telefone</label>
                        <Input id="telefone" type="text" placeholder="Digite o telefone" value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <Input id="email" type="text" placeholder="Digite o email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="">
                        <label htmlFor="">Investimentos</label>
                        <MultiSelect
                            options={investimentos.map(i => ({ id: i.id_investimento.toString(), nomeDoItem: i.investimento }))}
                            value={formData.Investimentos.map(i => ({ id: i.id_investimento.toString(), nomeDoItem: i.nome_investimento }))}
                            onChange={(items) => setFormData({ ...formData, Investimentos: items.map(i => ({ id_investimento: parseInt(i.id), nome_investimento: i.nomeDoItem })) })}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Produtos/Serviços</label>
                        <MultiSelect
                            options={produtosServicos.map(p => ({ id: p.id_produtos_servicos.toString(), nomeDoItem: p.produto_servico }))}
                            value={formData.ProdutosServicos.map(p => ({ id: p.id_produto_servico.toString(), nomeDoItem: p.nome_produto_servico }))}
                            onChange={(items) => setFormData({ ...formData, ProdutosServicos: items.map(i => ({ id_produto_servico: parseInt(i.id), nome_produto_servico: i.nomeDoItem })) })}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Rating de Crédito</label>
                        <Select
                            options={ratingCredito.map(r => ({ id: r.id_rating_credito.toString(), nomeDoItem: r.rating_credito }))}
                            value={formData.RatingCredito}
                            onSelect={(item) => setFormData({ ...formData, RatingCredito: item.id })}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Cheque especial</label>
                        <div className="flex flex-col md:flex-row gap-2">
                            <Select
                                options={[{ id: "1", nomeDoItem: "SIM" }, { id: "2", nomeDoItem: "NAO" }]}
                                value={formData.crot === "SIM" ? "1" : (formData.crot === "NAO" ? "2" : formData.crot)}
                                onSelect={(item) => { setFormData({ ...formData, crot: item.nomeDoItem }) }}
                            />
                        </div>
                    </div>

                    <div className="flex items-end mt-1">
                        <Button type="button" onClick={handleSubmit} disabled={loading} className="w-full">
                            {loading ? "Salvando..." : "Salvar Edição"}
                        </Button>
                    </div>
                </div>
            </form >
        </div >
    )
}
