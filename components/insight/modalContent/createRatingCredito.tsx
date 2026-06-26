import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRatingCreditoMutation } from "@/hooks/mutations/useRatingCreditoMutation"
import { windowDispatchFeedback } from "../feedbackModal"

export const ModalCreateRatingCredito = ({ onDirtyChange }: { onDirtyChange?: (dirty: boolean) => void }) => {
    const [ratingCredito, setRatingCredito] = useState("");
    const { mutateAsync: createRatingCredito } = useRatingCreditoMutation();
    const isDirty = ratingCredito !== ""

    useEffect(() => {
        onDirtyChange?.(isDirty)
    }, [isDirty, onDirtyChange])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (ratingCredito.length < 2) {
            windowDispatchFeedback("error", "Preencha o campo rating de crédito com pelo menos 2 caracteres");
            return;
        }
        createRatingCredito({ rating_credito: ratingCredito });
        setRatingCredito("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="ratingCredito" className="text-sm font-medium text-foreground">Rating de Crédito</label>
                <Input required name="ratingCredito" id="ratingCredito" value={ratingCredito} onChange={(e) => setRatingCredito(e.target.value)} placeholder="Digite o nome do rating de crédito" />
            </div>
            <div className="flex justify-end mt-4">
                <Button className="w-full sm:w-auto sm:min-w-[10rem]" type="submit">Salvar</Button>
            </div>
        </form>
    )
}
