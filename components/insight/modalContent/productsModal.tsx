import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import { ActionButton } from "../actionButton";
import { useMemo, useState } from "react";
import Image from "next/image";
import { ModalCreateProduct } from "./createProduct";
import { BaseModal } from "../modal";
import { useProdutos } from "@/hooks/queries/useProdutos";

export const ProductsModal = () => {

    const { data: produtos, isLoading } = useProdutos();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [innerDirty, setInnerDirty] = useState(false);

    const handleModalOpen = () => {
        if (isModalOpen) setInnerDirty(false);
        setIsModalOpen(!isModalOpen);
    }

    const rows = useMemo(() => {
        return produtos?.map((produto, index) => (
            <tr key={produto.id_produtos_servicos} className={`transition-colors hover:bg-accent/30 ${index % 2 === 0 ? 'bg-card' : 'bg-secondary/10'}`}>
                <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{produto.id_produtos_servicos}</td>
                <td className="py-3 px-4 text-foreground font-medium">{produto.produto_servico}</td>
                <td className="py-3 px-4 text-right">
                    <div className="inline-flex gap-1">
                        <ActionButton type="edit" idEmpresa={produto.id_produtos_servicos!} entity="produto" />
                        <ActionButton type="delete" idEmpresa={produto.id_produtos_servicos!} entity="produto" />
                    </div>
                </td>
            </tr>
        ));
    }, [produtos]);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-2 justify-between items-start sm:items-center">
                <h1 className="text-lg font-bold text-foreground">Produtos</h1>
                <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto" variant="default">
                    <Plus size={18} />
                    Cadastrar novo
                </Button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
                    <Loader className="animate-spin w-6 h-6" />
                    <p className="text-sm">Carregando produtos...</p>
                </div>
            ) : produtos?.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                    <div className="bg-secondary/50 p-4 rounded-full">
                        <Image src="/assets/images/no-data-image.svg" alt="Vazio" width={72} height={72} className="opacity-60" />
                    </div>
                    <div>
                        <h3 className="font-medium text-foreground">Nenhum produto encontrado</h3>
                        <p className="text-muted-foreground text-sm mt-1">Cadastre um novo produto para começar</p>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-secondary/60">
                                <th className="py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">ID</th>
                                <th className="py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Produto</th>
                                <th className="py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {rows}
                        </tbody>
                    </table>
                </div>
            )}
            {isModalOpen && (
                <BaseModal isOpen={isModalOpen} onClose={handleModalOpen} title="Cadastrar novo produto" size="sm" dirty={innerDirty}>
                    <ModalCreateProduct onDirtyChange={setInnerDirty} />
                </BaseModal>
            )}
        </div>
    )
}
