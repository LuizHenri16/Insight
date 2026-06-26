"use client"

import { Input } from "@/components/ui/input"
import { MaskedInput } from "@/components/ui/masked-input"
import { useInvestimentos } from "@/hooks/queries/useInvestimentos"
import { useProdutos } from "@/hooks/queries/useProdutos"
import { useRatingCredito } from "@/hooks/queries/useRatingCredito"
import { select } from "@/lib/utils/select"
import { EmpresaTable, EmpresaJoin } from "@/utils/types/Empresa"
import { useCallback, useEffect, useState } from "react"
import MultiSelect from "../multiSelect"
import Select from "../select"
import { FormSkeleton } from "../skeletons"

export const ViewForm = ({ id }: { id: number | string }) => {
    const { data: produtosServicos } = useProdutos();
    const { data: investimentos } = useInvestimentos();
    const { data: ratingCredito } = useRatingCredito();
    const [fetching, setFetching] = useState(true);
    const [dadosEmpresa, setEmpresa] = useState<EmpresaTable | null>(null);

    const getEmpresa = useCallback(async () => {
        setFetching(true);
        const empresa: EmpresaJoin = await select(id);

        const empresaFormatada: EmpresaTable = {
            id_empresa: empresa.id_empresa,
            conta: empresa.conta,
            nome_empresa: empresa.nome_empresa,
            cnpj_empresa: empresa.cnpj_empresa,
            email: empresa.email,
            telefone: empresa.telefone,
            crot: empresa.crot,
            id_rating_credito: empresa.id_rating_credito || 0,
            Socio: empresa.EmpresaSocio?.map((es) => es.Socio) || [],
            Investimentos: empresa.EmpresaInvestimento?.map((ei) => ei.Investimento) || [],
            ProdutosServicos: empresa.ProdutosServicosEmpresa?.map((pse) => pse.ProdutosServicos) || []
        };

        setEmpresa(empresaFormatada);
        setFetching(false);
    }, [id]);

    useEffect(() => {
        getEmpresa();
    }, [getEmpresa]);

    if (fetching) {
        return <FormSkeleton />;
    }

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col gap-8">
                <section className="space-y-5">
                    <div className="border-b border-border pb-3">
                        <h2 className="text-xl font-semibold text-foreground">Dados da Empresa</h2>
                        <p className="text-sm text-muted-foreground mt-1">Informações principais para identificação.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nome_empresa" className="text-sm font-medium text-foreground">Nome da empresa</label>
                            <Input disabled={true} id="nome_empresa" type="text" placeholder="Digite o nome da empresa" value={dadosEmpresa?.nome_empresa || ""} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cnpj_empresa" className="text-sm font-medium text-foreground">CNPJ</label>
                            <MaskedInput mask="cnpj" disabled id="cnpj_empresa" type="text" placeholder="00.000.000/0000-00" value={dadosEmpresa?.cnpj_empresa || ""} onChange={() => {}} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="conta" className="text-sm font-medium text-foreground">Conta</label>
                            <Input disabled={true} id="conta" type="text" placeholder="Digite o número da conta" value={dadosEmpresa?.conta || ""} />
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
                                    <Input disabled={true} id="socio1_nome" type="text" placeholder="Digite o nome do sócio 1" value={dadosEmpresa?.Socio[0]?.nome_socio || ""} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="socio1_cpf" className="text-sm font-medium text-foreground">CPF ou CNPJ</label>
                                    <MaskedInput mask="cpfCnpj" disabled id="socio1_cpf" type="text" placeholder="CPF ou CNPJ do sócio 1" value={dadosEmpresa?.Socio[0]?.cpfcnpj_socio || ""} onChange={() => {}} />
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
                                    <Input disabled={true} id="socio2_nome" type="text" placeholder="Digite o nome do sócio 2" value={dadosEmpresa?.Socio[1]?.nome_socio || ""} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="socio2_cpf" className="text-sm font-medium text-foreground">CPF ou CNPJ</label>
                                    <MaskedInput mask="cpfCnpj" disabled id="socio2_cpf" type="text" placeholder="CPF ou CNPJ do sócio 2" value={dadosEmpresa?.Socio[1]?.cpfcnpj_socio || ""} onChange={() => {}} />
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
                            <MaskedInput mask="phone" disabled id="telefone" type="text" placeholder="(00) 00000-0000" value={dadosEmpresa?.telefone || ""} onChange={() => {}} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                            <Input disabled={true} id="email" type="text" placeholder="Digite o email" value={dadosEmpresa?.email || ""} />
                        </div>
                    </div>
                </section>

                <section className="space-y-5">
                    <div className="border-b border-border pb-3">
                        <h2 className="text-xl font-semibold text-foreground">Financeiro</h2>
                        <p className="text-sm text-muted-foreground mt-1">Informações financeiras, investimentos e crédito.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">Investimentos</label>
                            <MultiSelect options={(investimentos || [])
                                .map(i => ({ id: i.id_investimento!.toString(), nomeDoItem: i.investimento }))} value={dadosEmpresa?.Investimentos?.map(i => ({ id: i.id_investimento.toString(), nomeDoItem: i.investimento })) || []} />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">Produtos/Serviços</label>
                            <MultiSelect options={(produtosServicos || [])
                                .map(p => ({ id: p.id_produtos_servicos!.toString(), nomeDoItem: p.produto_servico }))} value={dadosEmpresa?.ProdutosServicos?.map(p => ({ id: p.id_produtos_servicos.toString(), nomeDoItem: p.produto_servico })) || []} />
                        </div>


                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">Rating de Crédito</label>
                            <Select options={(ratingCredito || []).map(r => ({ id: r.id_rating_credito.toString(), nomeDoItem: r.rating_credito }))} value={dadosEmpresa?.id_rating_credito?.toString()} />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">Cheque especial</label>
                            <Select options={[{ id: "1", nomeDoItem: "SIM" }, { id: "2", nomeDoItem: "NAO" }]} value={dadosEmpresa?.crot === "SIM" ? "1" : (dadosEmpresa?.crot === "NAO" ? "2" : dadosEmpresa?.crot)} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
