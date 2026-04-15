import { useMutation, useQueryClient } from "@tanstack/react-query"
import { windowDispatchFeedback } from "@/components/insight/feedbackModal"
import { postInvestimento, updateInvestimento, deleteInvestimento } from "@/api/investimento/routes"


export const useInvestimentosMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        // Função que será chamada quando a mutação for disparada
        mutationFn: postInvestimento,

        onSuccess: () => {
            // Invalida a query de investimentos para atualizar a lista
            queryClient.invalidateQueries({ queryKey: ['investimentos'] })
            // Dispara sucesso em caso de criação do investimento
            windowDispatchFeedback("success", "Investimento cadastrado com sucesso!");
        },

        onError: (error) => {
            // Dispara erro em caso de falha na criação do investimento
            windowDispatchFeedback("error", error.message);
        }
    })

}

export const useUpdateInvestimentoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, investimento }: { id: number, investimento: string }) => updateInvestimento(id, { investimento }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investimentos'] })
            windowDispatchFeedback("success", "Investimento atualizado com sucesso!");
        },
        onError: (error) => {
            windowDispatchFeedback("error", error.message);
        }
    })
}

export const useDeleteInvestimentoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteInvestimento(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investimentos'] })
            windowDispatchFeedback("success", "Investimento excluído com sucesso!");
        },
        onError: (error) => {
            windowDispatchFeedback("error", error.message);
        }
    })
}


