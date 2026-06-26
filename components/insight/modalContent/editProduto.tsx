"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUpdateProdutoMutation } from "@/hooks/mutations/useProdutosMutation"
import { useProdutos } from "@/hooks/queries/useProdutos"

export const ModalEditProduto = ({ id, onDirtyChange }: { id: number | string, onDirtyChange?: (dirty: boolean) => void }) => {
    const { data: produtos, isLoading: isLoadingProdutos } = useProdutos();
    const [produtoEdit, setProdutoEdit] = useState<string>("")
    const { mutate, isPending } = useUpdateProdutoMutation();
    const initialRef = useRef("");

    const isDirty = produtoEdit !== initialRef.current;

    useEffect(() => {
        onDirtyChange?.(isDirty);
    }, [isDirty, onDirtyChange]);

    const produto = produtos?.find((produto) => produto.id_produtos_servicos === Number(id));

    useEffect(() => {
        if (produto) {
            setProdutoEdit(produto.produto_servico);
            initialRef.current = produto.produto_servico;
        }
    }, [produto]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ id: Number(id), produto: produtoEdit });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="produto_servico" className="text-sm font-medium text-foreground">Produto</label>
                <Input
                    required
                    name="produto_servico"
                    id="produto_servico"
                    value={produtoEdit}
                    onChange={(e) => setProdutoEdit(e.target.value)}
                    placeholder="Digite o nome do produto"
                />
            </div>
            <div className="flex justify-end mt-4">
                <Button className="w-full sm:w-auto sm:min-w-[10rem]" type="submit" disabled={isPending || isLoadingProdutos}>
                    {isPending ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    )
}
