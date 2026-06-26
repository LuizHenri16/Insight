import { save } from "@/api/empresa/create"
import { windowDispatchFeedback } from "@/components/insight/feedbackModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MaskedInput } from "@/components/ui/masked-input"
import { useInvestimentos } from "@/hooks/queries/useInvestimentos"
import { useProdutos } from "@/hooks/queries/useProdutos"
import { useRatingCredito } from "@/hooks/queries/useRatingCredito"
import { EmpresaForm } from "@/utils/types/Empresa"
import { useEffect, useMemo, useState } from "react"
import MultiSelect from "../multiSelect"
import Select from "../select"
import { validateForm } from "@/utils/validate/formValidate"

const initialFormData: EmpresaForm = {
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
};

export const CreateForm = ({ onDirtyChange }: { onDirtyChange?: (dirty: boolean) => void }) => {
    const { data: produtosServicos } = useProdutos();
    const { data: investimentos } = useInvestimentos();
    const { data: ratingCredito } = useRatingCredito();

    const [formData, setFormData] = useState<EmpresaForm>(initialFormData);

    const [loading, setLoading] = useState(false);

    const isDirty = useMemo(() => {
        return JSON.stringify(formData) !== JSON.stringify(initialFormData);
    }, [formData]);

    useEffect(() => {
        onDirtyChange?.(isDirty);
    }, [isDirty, onDirtyChange]);

    const updateSocio = (index: number, field: 'nome_socio' | 'cpfcnpj_socio', value: string) => {
        const newSocios = [...formData.Socio];
        if (!newSocios[index]) newSocios[index] = { nome_socio: "", cpfcnpj_socio: "" };
        newSocios[index][field] = value;
        setFormData({ ...formData, Socio: newSocios });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!validateForm(formData)) return;

        setLoading(true);
        try {
            await save(formData);
            windowDispatchFeedback("success", "Empresa cadastrada com sucesso!");
            setFormData(initialFormData);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro ao salvar os dados.";
            windowDispatchFeedback("error", message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-5xl mx-auto">
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <section className="space-y-5">
                    <div className="border-b border-border pb-3">
                        <h2 className="text-xl font-semibold text-foreground">Dados da Empresa</h2>
                        <p className="text-sm text-muted-foreground mt-1">Informações principais para identificação.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nome_empresa" className="text-sm font-medium text-foreground">Nome da empresa</label>
                            <Input id="nome_empresa" type="text" placeholder="Digite o nome da empresa" value={formData.nome_empresa} onChange={(e) => setFormData({ ...formData, nome_empresa: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cnpj_empresa" className="text-sm font-medium text-foreground">CNPJ</label>
                            <MaskedInput mask="cnpj" id="cnpj_empresa" type="text" placeholder="00.000.000/0000-00" value={formData.cnpj_empresa} onChange={(v) => setFormData({ ...formData, cnpj_empresa: v })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="conta" className="text-sm font-medium text-foreground">Conta</label>
                            <Input id="conta" type="text" placeholder="Digite o número da conta" value={formData.conta} onChange={(e) => setFormData({ ...formData, conta: e.target.value })} />
                        </div>
                    </div>
                </section>

                <section className="space-y-5">
                    <div className="border-b border-border pb-3">
                        <h2 className="text-xl font-semibold text-foreground">Dados dos Sócios</h2>
                        <p className="text-sm text-muted-foreground mt-1">Informações sobre os sócios da empresa.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="p-5 rounded-xl bg-secondary/50 border border-border space-y-4">
                            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                                Sócio Primário
                            </h3>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="socio1_nome" className="text-sm font-medium text-foreground">Nome completo</label>
                                    <Input id="socio1_nome" type="text" placeholder="Digite o nome do sócio 1" value={formData.Socio[0]?.nome_socio || ""} onChange={(e) => updateSocio(0, "nome_socio", e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="socio1_cpf" className="text-sm font-medium text-foreground">CPF ou CNPJ</label>
                                    <MaskedInput mask="cpfCnpj" id="socio1_cpf" type="text" placeholder="CPF ou CNPJ do sócio 1" value={formData.Socio[0]?.cpfcnpj_socio || ""} onChange={(v) => updateSocio(0, "cpfcnpj_socio", v)} />
                                </div>
                            </div>
                        </div>

                        <div className="p-5 rounded-xl bg-secondary/50 border border-border space-y-4">
                            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                                Sócio Secundário
                            </h3>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="socio2_nome" className="text-sm font-medium text-foreground">Nome completo</label>
                                    <Input id="socio2_nome" type="text" placeholder="Digite o nome do sócio 2" value={formData.Socio[1]?.nome_socio || ""} onChange={(e) => updateSocio(1, "nome_socio", e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="socio2_cpf" className="text-sm font-medium text-foreground">CPF ou CNPJ</label>
                                    <MaskedInput mask="cpfCnpj" id="socio2_cpf" type="text" placeholder="CPF ou CNPJ do sócio 2" value={formData.Socio[1]?.cpfcnpj_socio || ""} onChange={(v) => updateSocio(1, "cpfcnpj_socio", v)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-5">
                    <div className="border-b border-border pb-3">
                        <h2 className="text-xl font-semibold text-foreground">Dados de Contato</h2>
                        <p className="text-sm text-muted-foreground mt-1">Meios de comunicação com a empresa.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="telefone" className="text-sm font-medium text-foreground">Telefone</label>
                            <MaskedInput mask="phone" id="telefone" type="text" placeholder="(00) 00000-0000" value={formData.telefone} onChange={(v) => setFormData({ ...formData, telefone: v })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                            <Input id="email" type="email" placeholder="Digite o email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                    </div>
                </section>

                <section className="space-y-5">
                    <div className="border-b border-border pb-3">
                        <h2 className="text-xl font-semibold text-foreground">Financeiro</h2>
                        <p className="text-sm text-muted-foreground mt-1">Informações financeiras, investimentos e crédito.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">Investimentos</label>
                            <MultiSelect options={(investimentos || [])
                                .filter(i => i.id_investimento !== undefined)
                                .map(i => ({ id: i.id_investimento!.toString(), nomeDoItem: i.investimento }))}
                                onChange={(items) => setFormData({ ...formData, Investimentos: items.map(i => ({ id_investimento: parseInt(i.id), investimento: i.nomeDoItem })) })} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">Produtos/Serviços</label>
                            <MultiSelect options={(produtosServicos || [])
                                .filter(i => i.id_produtos_servicos !== undefined)
                                .map(p => ({ id: p.id_produtos_servicos!.toString(), nomeDoItem: p.produto_servico }))}
                                onChange={(items) => setFormData({ ...formData, ProdutosServicos: items.map(i => ({ id_produto_servico: parseInt(i.id), produto_servico: i.nomeDoItem })) })} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">Rating de Crédito</label>
                            <Select options={(ratingCredito || []).map(r => ({ id: r.id_rating_credito.toString(), nomeDoItem: r.rating_credito }))} onSelect={(item) => setFormData({ ...formData, RatingCredito: item.id })} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">Cheque especial</label>
                            <Select options={[{ id: "1", nomeDoItem: "SIM" }, { id: "2", nomeDoItem: "NAO" }]} onSelect={(item) => { setFormData({ ...formData, crot: item.nomeDoItem }) }} />
                        </div>
                    </div>
                </section>

                <div className="pt-5 mt-2 border-t border-border flex justify-end">
                    <Button type="submit" disabled={loading} className="w-full md:w-auto md:min-w-[200px]" size="lg">
                        {loading ? "Salvando..." : "Cadastrar Empresa"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
