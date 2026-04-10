import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { Investimento } from "@/utils/types/investimento"
import { windowDispatchFeedback } from "@/components/insight/feedbackModal"

export const useInvestimentosMutation = () => {
    const queryClient = useQueryClient()
    const supabase = createClient()

    return useMutation({
        mutationFn: async (novoInvestimento: Partial<Investimento>) => {
            const { data, error } = await supabase
                .from('Investimento')
                .insert([novoInvestimento])

            if (error) throw error
            return data
        },
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
