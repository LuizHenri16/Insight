import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useProdutosMutation } from "@/hooks/mutations/useProdutosMutation"
import { useEffect, useState } from "react"
import { windowDispatchFeedback } from "../feedbackModal"

export const ModalCreateProduct = ({ onDirtyChange }: { onDirtyChange?: (dirty: boolean) => void }) => {

    const [produto, setProduto] = useState("")
    const { mutateAsync: createProduct } = useProdutosMutation()

    const isDirty = produto !== ""

    useEffect(() => {
        onDirtyChange?.(isDirty)
    }, [isDirty, onDirtyChange])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (produto.length < 2) {
            windowDispatchFeedback("error", "Preencha o campo produto com pelo menos 2 caracteres");
            return;
        }
        createProduct({ produto_servico: produto })
        setProduto("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="produto_servico" className="text-sm font-medium text-foreground">Produto</label>
                <Input required name="produto_servico" id="produto_servico" value={produto} onChange={(e) => setProduto(e.target.value)} placeholder="Digite o nome do produto" />
            </div>
            <div className="flex justify-end mt-4">
                <Button className="w-full sm:w-auto sm:min-w-[10rem]" type="submit">Salvar</Button>
            </div>
        </form>
    )
}
