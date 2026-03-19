"use client"

import { Input } from "@/components/ui/input"
import MultiSelect from "../multiSelect"
import Select from "../select"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { EmpresaForm, EmpresaTable } from "@/utils/types/Empresa"
import { getRatingCredito } from "@/lib/utils/ratingcredito"
import { RatingCredito } from "@/utils/types/ratingcredito"
import { Investimento } from "@/utils/types/investimento"
import { ProdutoServico } from "@/utils/types/produtoservico"
import { getProdutoServico } from "@/lib/utils/produtoservico"
import { getInvestimento } from "@/lib/utils/investimento"
import { select } from "@/lib/utils/select"

export const ViewForm = ({ id }: { id: number | string }) => {

    const [ratingCredito, setRatingCredito] = useState<RatingCredito[]>([]);
    const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
    const [produtosServicos, setProdutosServicos] = useState<ProdutoServico[]>([]);

    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        getRatingCredito().then((data) => setRatingCredito(data));
        getInvestimento().then((data) => setInvestimentos(data));
        getProdutoServico().then((data) => setProdutosServicos(data));
    }, []);

    const [dadosEmpresa, setEmpresa] = useState<EmpresaTable | null>(null);

    const getEmpresa = async () => {
        setFetching(true);
        const empresa = await select(id);

        const empresaFormatada: EmpresaTable = {
            id_empresa: empresa.id_empresa,
            conta: empresa.conta,
            nome_empresa: empresa.nome_empresa,
            cnpj_empresa: empresa.cnpj_empresa,
            email: empresa.email,
            telefone: empresa.telefone,
            crot: empresa.crot,
            id_rating_credito: empresa.id_rating_credito,
            Socio: empresa.EmpresaSocio?.map((es: any) => es.Socio) || [],
            Investimentos: empresa.EmpresaInvestimento?.map((ei: any) => ei.Investimento) || [],
            ProdutosServicos: empresa.ProdutosServicosEmpresa?.map((pse: any) => pse.ProdutosServicos) || []
        };

        setEmpresa(empresaFormatada);
        setFetching(false);
    }

    useEffect(() => {
        getEmpresa();
    }, [id]);

    if (fetching) {
        return <div className="p-4">Carregando dados...</div>;
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-2 sm:p-6">
            <form className="flex flex-col gap-10">
                <section className="space-y-6">
                    <div className="border-b pb-3">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dados da Empresa</h2>
                        <p className="text-sm text-gray-500 mt-1">Informações principais para identificação.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nome_empresa" className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome da empresa</label>
                            <Input disabled={true} id="nome_empresa" type="text" placeholder="Digite o nome da empresa" value={dadosEmpresa?.nome_empresa || ""} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cnpj_empresa" className="text-sm font-medium text-gray-700 dark:text-gray-300">CNPJ</label>
                            <Input disabled={true} id="cnpj_empresa" type="text" placeholder="Digite o CNPJ" value={dadosEmpresa?.cnpj_empresa || ""} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="conta" className="text-sm font-medium text-gray-700 dark:text-gray-300">Conta</label>
                            <Input disabled={true} id="conta" type="text" placeholder="Digite o número da conta" value={dadosEmpresa?.conta || ""} />
                        </div>
                    </div>
                </section>

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
                                    <Input disabled={true} id="socio1_nome" type="text" placeholder="Digite o nome do sócio 1" value={dadosEmpresa?.Socio[0]?.nome_socio || ""} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="socio1_cpf" className="text-sm font-medium text-gray-700 dark:text-gray-300">CPF ou CNPJ</label>
                                    <Input disabled={true} id="socio1_cpf" type="text" placeholder="Digite o CPF/CNPJ do sócio 1" value={dadosEmpresa?.Socio[0]?.cpfcnpj_socio || ""} />
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
                                    <Input disabled={true} id="socio2_nome" type="text" placeholder="Digite o nome do sócio 2" value={dadosEmpresa?.Socio[1]?.nome_socio || ""} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="socio2_cpf" className="text-sm font-medium text-gray-700 dark:text-gray-300">CPF ou CNPJ</label>
                                    <Input disabled={true} id="socio2_cpf" type="text" placeholder="Digite o CPF/CNPJ do sócio 2" value={dadosEmpresa?.Socio[1]?.cpfcnpj_socio || ""} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="border-b pb-3">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dados de Contato</h2>
                        <p className="text-sm text-gray-500 mt-1">Meios de comunicação com a empresa.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="telefone" className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
                            <Input disabled={true} id="telefone" type="text" placeholder="Digite o telefone" value={dadosEmpresa?.telefone || ""} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <Input disabled={true} id="email" type="text" placeholder="Digite o email" value={dadosEmpresa?.email || ""} />
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="border-b pb-3">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Financeiro</h2>
                        <p className="text-sm text-gray-500 mt-1">Informações financeiras, investimentos e crédito.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Investimentos</label>
                            <MultiSelect options={investimentos.map(i => ({ id: i.id_investimento.toString(), nomeDoItem: i.investimento }))} value={dadosEmpresa?.Investimentos?.map(i => ({ id: i.id_investimento.toString(), nomeDoItem: i.investimento })) || []} />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Produtos/Serviços</label>
                            <MultiSelect options={produtosServicos.map(p => ({ id: p.id_produtos_servicos.toString(), nomeDoItem: p.produto_servico }))} value={dadosEmpresa?.ProdutosServicos?.map(p => ({ id: p.id_produtos_servicos.toString(), nomeDoItem: p.produto_servico })) || []} />
                        </div>


                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rating de Crédito</label>
                            <Select options={ratingCredito.map(r => ({ id: r.id_rating_credito.toString(), nomeDoItem: r.rating_credito }))} value={dadosEmpresa?.id_rating_credito?.toString()} />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cheque especial</label>
                            <Select options={[{ id: "1", nomeDoItem: "SIM" }, { id: "2", nomeDoItem: "NAO" }]} value={dadosEmpresa?.crot === "SIM" ? "1" : (dadosEmpresa?.crot === "NAO" ? "2" : dadosEmpresa?.crot)} />
                        </div>
                    </div>
                </section>
            </form>
        </div>
    )
}