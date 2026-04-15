"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { windowDispatchFeedback } from "../feedbackModal"
import { useInvestimentos } from "@/hooks/queries/useInvestimentos"
import { useUpdateInvestimentoMutation } from "@/hooks/mutations/useInvestimentosMutation"

export const ModalEditInvestimento = ({ id }: { id: number | string }) => {
    const { data: investimentos, isLoading: isLoadingInvestimentos } = useInvestimentos()
    const [investimentoEdit, setInvestimentoEdit] = useState("")
    const { mutate, isPending } = useUpdateInvestimentoMutation()

    const item = investimentos?.find((inv) => inv.id_investimento === Number(id))

    useEffect(() => {
        if (item) {
            setInvestimentoEdit(item.investimento || "")
        }
    }, [item])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const valor = investimentoEdit.trim()
        if (valor.length < 2) {
            windowDispatchFeedback("warning", "Preencha o investimento com pelo menos 2 caracteres")
            return
        }
        mutate({ id: Number(id), investimento: valor })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 p-2">
                <label htmlFor="investimento" className="text-sm font-medium dark:text-zinc-300">Investimento</label>
                <Input
                    required
                    name="investimento"
                    id="investimento"
                    value={investimentoEdit}
                    onChange={(e) => setInvestimentoEdit(e.target.value)}
                    placeholder="Digite o nome do investimento"
                />
            </div>
            <div className="flex justify-end">
                <Button className="w-[10rem]" type="submit" disabled={isPending || isLoadingInvestimentos}>
                    {isPending ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    )
}
