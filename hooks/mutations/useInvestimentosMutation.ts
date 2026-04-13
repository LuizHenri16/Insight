import { useMutation, useQueryClient } from "@tanstack/react-query"
import { windowDispatchFeedback } from "@/components/insight/feedbackModal"
import { postInvestimento } from "@/api/investimento/routes"

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
