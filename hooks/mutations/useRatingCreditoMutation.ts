import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { windowDispatchFeedback } from "@/components/insight/feedbackModal"
import { RatingCredito } from "@/utils/types/ratingcredito"

export const useRatingCreditoMutation = () => {
    const queryClient = useQueryClient()
    const supabase = createClient()

    return useMutation({
        // Função que será chamada quando o mutation for executado
        // Vai cadastrar um novo rating de crédito no banco de dados
        mutationFn: async (novoRatingCredito: Partial<RatingCredito>) => {
            const { data, error } = await supabase
                .from('RatingCredito')
                .insert([novoRatingCredito])

            if (error) throw error
            return data
        },

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