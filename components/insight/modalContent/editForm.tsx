"use client"

import { Input } from "@/components/ui/input"
import MultiSelect from "../multiSelect"
import Select from "../select"
import { windowDispatchFeedback } from "@/components/insight/feedbackModal"
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
            windowDispatchFeedback("error", "Erro ao carregar dados para edição.");
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
            windowDispatchFeedback("warning", "Preencha os campos obrigatórios: Nome, CNPJ e Conta.");
            return;
        }

        const empresaIdNumber = typeof id === 'string' ? parseInt(id) : id;

        setLoading(true);
        try {
            if (await update(empresaIdNumber, formData)) {
                windowDispatchFeedback("success", "Empresa atualizada com sucesso!");
                router.refresh();
            }
        } catch (error: any) {
            console.error(error);
            windowDispatchFeedback("error", error.message || "Erro ao salvar os dados.");
        } finally {
            setLoading(false);
        }
    }

    if (fetching) {
        return <div className="p-4">Carregando dados...</div>;
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-2 sm:p-6">
            <form className="flex flex-col gap-10">
                {/* Seção: Dados da Empresa */}
                <section className="space-y-6">
                    <div className="border-b pb-3">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dados da Empresa</h2>
                        <p className="text-sm text-gray-500 mt-1">Informações principais para identificação.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nome_empresa" className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome da empresa</label>
                            <Input id="nome_empresa" type="text" placeholder="Digite o nome da empresa" value={formData.nome_empresa} onChange={(e) => setFormData({ ...formData, nome_empresa: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cnpj_empresa" className="text-sm font-medium text-gray-700 dark:text-gray-300">CNPJ</label>
                            <Input id="cnpj_empresa" type="text" placeholder="Digite o CNPJ" value={formData.cnpj_empresa} onChange={(e) => setFormData({ ...formData, cnpj_empresa: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="conta" className="text-sm font-medium text-gray-700 dark:text-gray-300">Conta</label>
                            <Input id="conta" type="text" placeholder="Digite o número da conta" value={formData.conta} onChange={(e) => setFormData({ ...formData, conta: e.target.value })} />
                        </div>
                    </div>
                </section>

                {/* Seção: Dados dos Sócios */}
                <section className="space-y-6">
                    <div className="border-b pb-3">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dados dos Sócios</h2>
                        <p className="text-sm text-gray-500 mt-1">Informações sobre os sócios da empresa.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 rounded-xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 space-y-4">
                            <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                                Sócio Primário
                            </h3>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="socio1_nome" className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome completo</label>
                                    <Input id="socio1_nome" type="text" placeholder="Digite o nome do sócio 1" value={formData.Socio[0]?.nome_socio || ""} onChange={(e) => updateSocio(0, "nome_socio", e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="socio1_cpf" className="text-sm font-medium text-gray-700 dark:text-gray-300">CPF ou CNPJ</label>
                                    <Input id="socio1_cpf" type="text" placeholder="Digite o CPF/CNPJ do sócio 1" value={formData.Socio[0]?.cpfcnpj_socio || ""} onChange={(e) => updateSocio(0, "cpfcnpj_socio", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="p-5 rounded-xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 space-y-4">
                            <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                                Sócio Secundário
                            </h3>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="socio2_nome" className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome completo</label>
                                    <Input id="socio2_nome" type="text" placeholder="Digite o nome do sócio 2" value={formData.Socio[1]?.nome_socio || ""} onChange={(e) => updateSocio(1, "nome_socio", e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="socio2_cpf" className="text-sm font-medium text-gray-700 dark:text-gray-300">CPF ou CNPJ</label>
                                    <Input id="socio2_cpf" type="text" placeholder="Digite o CPF/CNPJ do sócio 2" value={formData.Socio[1]?.cpfcnpj_socio || ""} onChange={(e) => updateSocio(1, "cpfcnpj_socio", e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seção: Dados de Contato */}
                <section className="space-y-6">
                    <div className="border-b pb-3">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dados de Contato</h2>
                        <p className="text-sm text-gray-500 mt-1">Meios de comunicação com a empresa.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="telefone" className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
                            <Input id="telefone" type="text" placeholder="Digite o telefone" value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <Input id="email" type="email" placeholder="Digite o email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                    </div>
                </section>

                {/* Seção: Financeiro */}
                <section className="space-y-6">
                    <div className="border-b pb-3">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Financeiro</h2>
                        <p className="text-sm text-gray-500 mt-1">Informações financeiras, investimentos e crédito.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Investimentos</label>
                            <MultiSelect
                                options={investimentos.map(i => ({ id: i.id_investimento.toString(), nomeDoItem: i.investimento }))}
                                value={formData.Investimentos.map(i => ({ id: i.id_investimento.toString(), nomeDoItem: i.nome_investimento }))}
                                onChange={(items) => setFormData({ ...formData, Investimentos: items.map(i => ({ id_investimento: parseInt(i.id), nome_investimento: i.nomeDoItem })) })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Produtos/Serviços</label>
                            <MultiSelect
                                options={produtosServicos.map(p => ({ id: p.id_produtos_servicos.toString(), nomeDoItem: p.produto_servico }))}
                                value={formData.ProdutosServicos.map(p => ({ id: p.id_produto_servico.toString(), nomeDoItem: p.nome_produto_servico }))}
                                onChange={(items) => setFormData({ ...formData, ProdutosServicos: items.map(i => ({ id_produto_servico: parseInt(i.id), nome_produto_servico: i.nomeDoItem })) })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rating de Crédito</label>
                            <Select
                                options={ratingCredito.map(r => ({ id: r.id_rating_credito.toString(), nomeDoItem: r.rating_credito }))}
                                value={formData.RatingCredito}
                                onSelect={(item) => setFormData({ ...formData, RatingCredito: item.id })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cheque especial</label>
                            <Select
                                options={[{ id: "1", nomeDoItem: "SIM" }, { id: "2", nomeDoItem: "NAO" }]}
                                value={formData.crot === "SIM" ? "1" : (formData.crot === "NAO" ? "2" : formData.crot)}
                                onSelect={(item) => { setFormData({ ...formData, crot: item.nomeDoItem }) }}
                            />
                        </div>
                    </div>
                </section>

                <div className="pt-6 mt-4 border-t flex justify-end">
                    <Button type="button" onClick={handleSubmit} disabled={loading} className="w-full md:w-auto md:min-w-[200px]" size="lg">
                        {loading ? "Salvando..." : "Salvar Edição"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
