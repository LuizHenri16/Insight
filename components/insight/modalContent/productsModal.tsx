import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import { ActionButton } from "../actionButton";
import { useMemo, useState } from "react";
import Image from "next/image";
import { ModalCreateProduct } from "./createProduct";
import { BaseModal } from "../modal";
import { useProdutos } from "@/hooks/queries/useProdutos";

export const ProductsModal = () => {

    // Busca os produtos cadastrados
    const { data: produtos, isLoading } = useProdutos();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Função para fechar o modal
    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    }

    const rows = useMemo(() => {
        return produtos?.map((produto) => (
            <tr key={produto.id_produtos_servicos} className="border-b border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                <td className="py-3 px-4 text-slate-600 dark:text-zinc-300">{produto.id_produtos_servicos}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-zinc-300">{produto.produto_servico}</td>
                <td className="py-3 px-4 flex justify-end gap-2">
                    <ActionButton type="edit" idEmpresa={produto.id_produtos_servicos!} entity="produto" />
                    <ActionButton type="delete" idEmpresa={produto.id_produtos_servicos!} entity="produto" />
                </td>
            </tr>
        ));
    }, [produtos]);

    return (
        <div className="w-full max-h-[24rem] overflow-y-auto flex flex-col gap-4">
            <div className="w-full flex gap-2 justify-between items-center">
                <h1 className="text-lg font-bold dark:text-zinc-100">Produtos</h1>
                <Button onClick={() => setIsModalOpen(true)} className="w-40" variant="default">
                    <Plus size={18} />
                    Cadastrar novo
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-zinc-700">
                            <th className="py-3 px-4 font-medium dark:text-zinc-200">ID</th>
                            <th className="py-3 px-4 font-medium dark:text-zinc-200">Produto</th>
                            <th className="py-3 px-4 font-medium text-right">Ações</th>
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
                            produtos?.length === 0 ? (
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
            {isModalOpen && (
                <BaseModal isOpen={isModalOpen} onClose={handleModalOpen} title="Cadastrar novo produto">
                    <ModalCreateProduct />
                </BaseModal>
            )}
        </div>
    )
}