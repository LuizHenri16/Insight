import { Input } from "@/components/ui/input"
import MultiSelect from "../multiSelect"
import Select from "../select"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { EmpresaForm } from "@/utils/types/Empresa"
import { save } from "@/lib/utils/create"
import { getRatingCredito } from "@/lib/utils/ratingcredito"
import { RatingCredito } from "@/utils/types/ratingcredito"
import { Investimento } from "@/utils/types/investimento"
import { ProdutoServico } from "@/utils/types/produtoservico"
import { getProdutoServico } from "@/lib/utils/produtoservico"
import { getInvestimento } from "@/lib/utils/investimento"

export const CreateForm = () => {

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
        setLoading(true);
        try {
            if (await save(formData)) {
                alert("Empresa cadastrada com sucesso!");
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Erro ao salvar os dados.");
        } finally {
            setLoading(false);
        }
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
                        <MultiSelect options={investimentos.map(i => ({ id: i.id_investimento.toString(), nomeDoItem: i.investimento }))} onChange={(items) => setFormData({ ...formData, Investimentos: items.map(i => ({ id_investimento: parseInt(i.id), nome_investimento: i.nomeDoItem })) })} />
                    </div>

                    <div>
                        <label htmlFor="">Produtos/Serviços</label>
                        <MultiSelect options={produtosServicos.map(p => ({ id: p.id_produtos_servicos.toString(), nomeDoItem: p.produto_servico }))} onChange={(items) => setFormData({ ...formData, ProdutosServicos: items.map(i => ({ id_produto_servico: parseInt(i.id), nome_produto_servico: i.nomeDoItem })) })} />
                    </div>

                    <div>
                        <label htmlFor="">Rating de Crédito</label>
                        <Select options={ratingCredito.map(r => ({ id: r.id_rating_credito.toString(), nomeDoItem: r.rating_credito }))} onSelect={(item) => setFormData({ ...formData, RatingCredito: item.id })} />
                    </div>

                    <div>
                        <label htmlFor="">Cheque especial</label>
                        <div className="flex flex-col md:flex-row gap-2">
                            <Select options={[{ id: "1", nomeDoItem: "SIM" }, { id: "2", nomeDoItem: "NAO" }]} onSelect={(item) => { setFormData({ ...formData, crot: item.nomeDoItem }) }} />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                        <Button variant="outline" type="button" className="w-full">Cancelar</Button>
                        <Button type="button" onClick={handleSubmit} disabled={loading} className="w-full">
                            {loading ? "Salvando..." : "Cadastrar"}
                        </Button>
                    </div>
                </div>
            </form >
        </div >
    )
}