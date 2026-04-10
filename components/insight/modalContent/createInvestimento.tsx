import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useInvestimentosMutation } from "@/hooks/mutations/useInvestimentosMutation"
import { windowDispatchFeedback } from "../feedbackModal"

export const ModalCreateInvestimento = () => {
    const [investimento, setInvestimento] = useState("")
    const { mutateAsync: createInvestimento } = useInvestimentosMutation()

    function handleSubmit(e: React.FormEvent) {
        // Impede o comportamento padrão do formulário de recarregar a página
        e.preventDefault()

        // Valida se o investimento foi preenchido
        if (investimento.length < 2) {
            windowDispatchFeedback("error", "Preencha o campo investimento com pelo menos 2 caracteres");
            return;
        }
        createInvestimento({ investimento })
        setInvestimento("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 p-2">
                <label htmlFor="investimento">Investimento</label>
                <Input required name="investimento" id="investimento" value={investimento} onChange={(e) => setInvestimento(e.target.value)} placeholder="Digite o nome do investimento" />
            </div>
            <div className="flex justify-end">
                <Button className="w-[10rem]" type="submit">Salvar</Button>
            </div>
        </form>
    )
}