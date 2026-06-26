import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useInvestimentosMutation } from "@/hooks/mutations/useInvestimentosMutation"
import { windowDispatchFeedback } from "../feedbackModal"

export const ModalCreateInvestimento = ({ onDirtyChange }: { onDirtyChange?: (dirty: boolean) => void }) => {
    const [investimento, setInvestimento] = useState("")
    const { mutateAsync: createInvestimento } = useInvestimentosMutation()
    const isDirty = investimento !== ""

    useEffect(() => {
        onDirtyChange?.(isDirty)
    }, [isDirty, onDirtyChange])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (investimento.length < 2) {
            windowDispatchFeedback("error", "Preencha o campo investimento com pelo menos 2 caracteres");
            return;
        }
        createInvestimento({ investimento })
        setInvestimento("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="investimento" className="text-sm font-medium text-foreground">Investimento</label>
                <Input required name="investimento" id="investimento" value={investimento} onChange={(e) => setInvestimento(e.target.value)} placeholder="Digite o nome do investimento" />
            </div>
            <div className="flex justify-end mt-4">
                <Button className="w-full sm:w-auto sm:min-w-[10rem]" type="submit">Salvar</Button>
            </div>
        </form>
    )
}
