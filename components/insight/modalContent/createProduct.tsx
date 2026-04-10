import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useProdutosMutation } from "@/hooks/mutations/useProdutosMutation"
import { useState } from "react"
import { windowDispatchFeedback } from "../feedbackModal"

export const ModalCreateProduct = () => {

    const [produto, setProduto] = useState("")
    const { mutateAsync: createProduct } = useProdutosMutation()

    function handleSubmit(e: React.FormEvent) {
        // Impede o comportamento padrão do formulário de recarregar a página
        e.preventDefault()

        // Valida se o produto foi preenchido
        if (produto.length < 2) {
            windowDispatchFeedback("error", "Preencha o campo produto com pelo menos 2 caracteres");
            return;
        }
        createProduct({ produto_servico: produto })
        setProduto("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 p-2">
                <label htmlFor="produto">Produto</label>
                <Input required name="produto_servico" id="produto_servico" value={produto} onChange={(e) => setProduto(e.target.value)} placeholder="Digite o nome do produto" />
            </div>
            <div className="flex justify-end">
                <Button className="w-[10rem]" type="submit">Salvar</Button>
            </div>
        </form>
    )
}