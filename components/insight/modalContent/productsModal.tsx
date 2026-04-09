import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import { ActionButton } from "../actionButton";
import { useEffect, useMemo, useState } from "react";
import { ProdutoServico } from "@/utils/types/produtoservico";
import { getProdutoServico } from "@/api/produtoservico/routes";
import Image from "next/image";

export const ProductsModal = () => {

    const [produtos, setProdutos] = useState<ProdutoServico[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const rows = useMemo(() => {
        return produtos.map((produto) => (
            <tr key={produto.id_produtos_servicos} className="border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{produto.id_produtos_servicos}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{produto.produto_servico}</td>
                <td className="py-3 px-4 flex justify-end gap-2">
                    <ActionButton type="edit" idEmpresa={produto.id_produtos_servicos} />
                    <ActionButton type="delete" idEmpresa={produto.id_produtos_servicos} />
                </td>
            </tr>
        ));
    }, [produtos]);

    useEffect(() => {
        const fetchProdutos = async () => {
            setIsLoading(true);
            const response = await getProdutoServico();
            setProdutos(response);
            setIsLoading(false);
        }
        fetchProdutos();
    }, []);


    return (
        <div className="w-full max-h-[24rem] overflow-y-auto flex flex-col gap-4">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-xl font-bold dark:text-white">Produtos</h1>
                <Button className="w-40" variant="default">
                    <Plus size={18} />
                    Cadastrar novo
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b dark:border-slate-700">
                            <th className="py-3 px-4 font-medium dark:text-slate-200">ID</th>
                            <th className="py-3 px-4 font-medium dark:text-slate-200">Produto</th>
                            <th className="py-3 px-4 font-medium dark:text-slate-200 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={3} className="py-10">
                                    <div className="flex flex-col items-center justify-center animate-pulse gap-2 text-slate-600 dark:text-slate-300">
                                        <Loader className="animate-spin" />
                                        <p>Carregando produtos...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            produtos.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">
                                        <Image src="/assets/images/no-data-image.svg" alt="Vazio " width={138} height={138} className="mx-auto" />
                                        <h3 className="mt-2 font-semibold text-slate-600 dark:text-slate-300">Nenhum produto encontrado</h3>
                                    </td>
                                </tr>
                            ) : (
                                rows
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}