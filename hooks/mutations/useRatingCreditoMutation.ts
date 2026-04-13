import { useMutation, useQueryClient } from "@tanstack/react-query"
import { windowDispatchFeedback } from "@/components/insight/feedbackModal"
import { postRatingCredito } from "@/api/ratingcredito/routes"

export const useRatingCreditoMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        // Função que será chamada quando o mutation for executado
        // Vai cadastrar um novo rating de crédito no banco de dados
        mutationFn: postRatingCredito,

        // Em caso de sucesso vai ser exibido o feedback apontando sucesso
        onSuccess: () => {
            // Invalida o cache da query 'ratingCredito' para que ela seja recarregada já com os novos dados
            queryClient.invalidateQueries({ queryKey: ['ratingCredito'] })
            windowDispatchFeedback("success", "Rating de crédito cadastrado com sucesso!");
        },

        // Em caso de erro vai ser exibido o feedback apontando o erro
        onError: (error) => {
            windowDispatchFeedback("error", error.message);
        }
    })
}