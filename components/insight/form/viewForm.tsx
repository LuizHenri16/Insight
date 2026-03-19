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
        <div>
            <form className="grid sm:grid-cols-1 text-left md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-200">
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="nome_empresa">Nome da empresa</label>
                        <Input disabled={true} id="nome_empresa" type="text" placeholder="Digite o nome da empresa" value={dadosEmpresa?.nome_empresa} />
                    </div>

                    <div>
                        <label htmlFor="cnpj_empresa">CNPJ</label>
                        <Input disabled={true} id="cnpj_empresa" type="text" placeholder="Digite o CNPJ" value={dadosEmpresa?.cnpj_empresa} />
                    </div>

                    <div>
                        <label htmlFor="conta">Conta</label>
                        <Input disabled={true} id="conta" type="text" placeholder="Digite o número da conta" value={dadosEmpresa?.conta} />
                    </div>

                    <div>
                        <label htmlFor="socio1_nome">Sócio 1</label>
                        <Input disabled={true} id="socio1_nome" type="text" placeholder="Digite o nome do sócio 1" value={dadosEmpresa?.Socio[0]?.nome_socio || ""} />
                    </div>

                    <div>
                        <label htmlFor="socio1_cpf">CPF/CNPJ 1</label>
                        <Input disabled={true} id="socio1_cpf" type="text" placeholder="Digite o CPF/CNPJ do sócio 1" value={dadosEmpresa?.Socio[0]?.cpfcnpj_socio || ""} />
                    </div>

                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="socio2_nome">Sócio 2</label>
                        <Input disabled={true} id="socio2_nome" type="text" placeholder="Digite o nome do sócio 2" value={dadosEmpresa?.Socio[1]?.nome_socio || ""} />
                    </div>

                    <div>
                        <label htmlFor="socio2_cpf">CPF/CNPJ 2</label>
                        <Input disabled={true} id="socio2_cpf" type="text" placeholder="Digite o CPF/CNPJ do sócio 2" value={dadosEmpresa?.Socio[1]?.cpfcnpj_socio || ""} />
                    </div>

                    <div>
                        <label htmlFor="telefone">Telefone</label>
                        <Input disabled={true} id="telefone" type="text" placeholder="Digite o telefone" value={dadosEmpresa?.telefone || ""} />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <Input disabled={true} id="email" type="text" placeholder="Digite o email" value={dadosEmpresa?.email || ""} />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="">
                        <label htmlFor="">Investimentos</label>
                        <MultiSelect options={investimentos.map(i => ({ id: i.id_investimento.toString(), nomeDoItem: i.investimento }))} value={dadosEmpresa?.Investimentos?.map(i => ({ id: i.id_investimento.toString(), nomeDoItem: i.investimento })) || []} />
                    </div>

                    <div>
                        <label htmlFor="">Produtos/Serviços</label>
                        <MultiSelect options={produtosServicos.map(p => ({ id: p.id_produtos_servicos.toString(), nomeDoItem: p.produto_servico }))} value={dadosEmpresa?.ProdutosServicos?.map(p => ({ id: p.id_produtos_servicos.toString(), nomeDoItem: p.produto_servico })) || []} />
                    </div>

                    <div>
                        <label htmlFor="">Rating de Crédito</label>
                        <Select options={ratingCredito.map(r => ({ id: r.id_rating_credito.toString(), nomeDoItem: r.rating_credito }))} value={dadosEmpresa?.id_rating_credito.toString()} />
                    </div>

                    <div>
                        <label htmlFor="">Cheque especial</label>
                        <div className="flex flex-col md:flex-row gap-2">
                            <Select options={[{ id: "1", nomeDoItem: "SIM" }, { id: "2", nomeDoItem: "NAO" }]} value={dadosEmpresa?.crot === "SIM" ? "1" : (dadosEmpresa?.crot === "NAO" ? "2" : dadosEmpresa?.crot)} />
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}