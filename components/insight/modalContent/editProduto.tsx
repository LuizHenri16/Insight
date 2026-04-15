"use client"

import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { windowDispatchFeedback } from "../feedbackModal"
import { getProdutoById, updateProduto } from "@/api/produtoservico/routes"
import { useUpdateProdutoMutation } from "@/hooks/mutations/useProdutosMutation"
import { useProdutos } from "@/hooks/queries/useProdutos"
import { ProdutoServico } from "@/utils/types/produtoservico"

export const ModalEditProduto = ({ id }: { id: number | string }) => {
    const { data: produtos, isLoading: isLoadingProdutos } = useProdutos();
    const [produtoEdit, setProdutoEdit] = useState<string>("")
    const { mutate, isPending } = useUpdateProdutoMutation();

    const produto = produtos?.find((produto) => produto.id_produtos_servicos === Number(id));

    useEffect(() => {
        if (produto) {
            setProdutoEdit(produto.produto_servico);
        }
    }, [produto]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ id: Number(id), produto: produtoEdit });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 p-2">
                <label htmlFor="produto_servico" className="text-sm font-medium dark:text-zinc-300">Produto</label>
                <Input
                    required
                    name="produto_servico"
                    id="produto_servico"
                    value={produtoEdit}
                    onChange={(e) => setProdutoEdit(e.target.value)}
                    placeholder="Digite o nome do produto"
                />
            </div>
            <div className="flex justify-end">
                <Button className="w-[10rem]" type="submit" disabled={isPending || isLoadingProdutos}>
                    {isPending ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    )
}
