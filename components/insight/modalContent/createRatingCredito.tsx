import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRatingCreditoMutation } from "@/hooks/mutations/useRatingCreditoMutation"
import { windowDispatchFeedback } from "../feedbackModal"

export const ModalCreateRatingCredito = () => {
    const [ratingCredito, setRatingCredito] = useState("");
    const { mutateAsync: createRatingCredito } = useRatingCreditoMutation();

    function handleSubmit(e: React.FormEvent) {
        // Impede o comportamento padrão do formulário de recarregar a página
        e.preventDefault()

        // Valida se o rating de crédito foi preenchido
        if (ratingCredito.length < 2) {
            windowDispatchFeedback("error", "Preencha o campo rating de crédito com pelo menos 2 caracteres");
            return;
        }
        createRatingCredito({ rating_credito: ratingCredito });
        setRatingCredito("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 p-2">
                <label htmlFor="ratingCredito">Rating de Crédito</label>
                <Input required name="ratingCredito" id="ratingCredito" value={ratingCredito} onChange={(e) => setRatingCredito(e.target.value)} placeholder="Digite o nome do rating de crédito" />
            </div>
            <div className="flex justify-end">
                <Button className="w-[10rem]" type="submit">Salvar</Button>
            </div>
        </form>
    )
}