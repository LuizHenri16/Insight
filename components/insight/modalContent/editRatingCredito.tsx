"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { windowDispatchFeedback } from "../feedbackModal"
import { useRatingCredito } from "@/hooks/queries/useRatingCredito"
import { useUpdateRatingCreditoMutation } from "@/hooks/mutations/useRatingCreditoMutation"

export const ModalEditRatingCredito = ({ id }: { id: number | string }) => {
    const { data: ratings, isLoading: isLoadingRatings } = useRatingCredito()
    const [ratingEdit, setRatingEdit] = useState("")
    const { mutate, isPending } = useUpdateRatingCreditoMutation()

    const item = ratings?.find((r) => r.id_rating_credito === Number(id))

    useEffect(() => {
        if (item) {
            setRatingEdit(item.rating_credito || "")
        }
    }, [item])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const valor = ratingEdit.trim()
        if (valor.length < 2) {
            windowDispatchFeedback("warning", "Preencha o rating de crédito com pelo menos 2 caracteres")
            return
        }

        mutate({ id: Number(id), ratingCredito: valor })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 p-2">
                <label htmlFor="ratingCredito" className="text-sm font-medium dark:text-zinc-300">Rating de Crédito</label>
                <Input 
                    required 
                    name="ratingCredito" 
                    id="ratingCredito" 
                    value={ratingEdit} 
                    onChange={(e) => setRatingEdit(e.target.value)} 
                    placeholder="Digite o nome do rating de crédito" 
                />
            </div>
            <div className="flex justify-end">
                <Button className="w-[10rem]" type="submit" disabled={isPending || isLoadingRatings}>
                    {isPending ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    )
}
