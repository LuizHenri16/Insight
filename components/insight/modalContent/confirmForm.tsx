"use client";

import { Button } from "@/components/ui/button";
import { deleteEmpresa } from "@/lib/utils/delete";
import { useDeleteProdutoMutation } from "@/hooks/mutations/useProdutosMutation";
import { useDeleteInvestimentoMutation } from "@/hooks/mutations/useInvestimentosMutation";
import { useDeleteRatingCreditoMutation } from "@/hooks/mutations/useRatingCreditoMutation";

interface Props {
    idEmpresa: number;
    entity?: 'empresa' | 'produto' | 'ratingCredito' | 'investimento';
}

export const DeleteConfirmForm = ({ idEmpresa, entity = 'empresa' }: Props) => {
    const { mutate: deleteProduto, isPending: isDeletingProduto } = useDeleteProdutoMutation();
    const { mutate: deleteInvestimento, isPending: isDeletingInvestimento } = useDeleteInvestimentoMutation();
    const { mutate: deleteRatingCredito, isPending: isDeletingRatingCredito } = useDeleteRatingCreditoMutation();

    const isPending = isDeletingProduto || isDeletingInvestimento || isDeletingRatingCredito;

    const handleConfirm = () => {
        if (entity === 'produto') {
            deleteProduto(idEmpresa);
        } else if (entity === 'investimento') {
            deleteInvestimento(idEmpresa);
        } else if (entity === 'ratingCredito') {
            deleteRatingCredito(idEmpresa);
        } else {
            // Fallback for 'empresa' (legacy manual call or could be refactored later)
            deleteEmpresa(idEmpresa);
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-[#1B2F53] dark:text-zinc-200">Confirmação</p>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Tem certeza que deseja excluir este item?</p>
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="destructive" onClick={handleConfirm} disabled={isPending}>
                    {isPending ? "Excluindo..." : "Confirmar"}
                </Button>
            </div>
        </div>
    );
}