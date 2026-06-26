"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { windowDispatchFeedback } from "../feedbackModal"
import { useInvestimentos } from "@/hooks/queries/useInvestimentos"
import { useUpdateInvestimentoMutation } from "@/hooks/mutations/useInvestimentosMutation"

export const ModalEditInvestimento = ({ id, onDirtyChange }: { id: number | string, onDirtyChange?: (dirty: boolean) => void }) => {
    const { data: investimentos, isLoading: isLoadingInvestimentos } = useInvestimentos()
    const [investimentoEdit, setInvestimentoEdit] = useState("")
    const { mutate, isPending } = useUpdateInvestimentoMutation()
    const initialRef = useRef("")

    const isDirty = investimentoEdit !== initialRef.current

    useEffect(() => {
        onDirtyChange?.(isDirty)
    }, [isDirty, onDirtyChange])

    const item = investimentos?.find((inv) => inv.id_investimento === Number(id))

    useEffect(() => {
        if (item) {
            setInvestimentoEdit(item.investimento || "")
            initialRef.current = item.investimento || ""
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
            <div className="flex flex-col gap-2">
                <label htmlFor="investimento" className="text-sm font-medium text-foreground">Investimento</label>
                <Input
                    required
                    name="investimento"
                    id="investimento"
                    value={investimentoEdit}
                    onChange={(e) => setInvestimentoEdit(e.target.value)}
                    placeholder="Digite o nome do investimento"
                />
            </div>
            <div className="flex justify-end mt-4">
                <Button className="w-full sm:w-auto sm:min-w-[10rem]" type="submit" disabled={isPending || isLoadingInvestimentos}>
                    {isPending ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    )
}
