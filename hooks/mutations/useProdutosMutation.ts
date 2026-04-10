import { ProdutoServico } from "@/utils/types/produtoservico"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { windowDispatchFeedback } from "@/components/insight/feedbackModal"

export const useProdutosMutation = () => {
    const queryClient = useQueryClient()
    const supabase = createClient()

    return useMutation({
        mutationFn: async (novoProduto: Partial<ProdutoServico>) => {
            const { data, error } = await supabase
                .from('ProdutosServicos')
                .insert([novoProduto])

            if (error) throw error
            return data
        },
        onSuccess: () => {
            // Invalida a query de produtos para atualizar a lista
            queryClient.invalidateQueries({ queryKey: ['produtos'] })
            // Dispara sucesso em caso de criação do produto
            windowDispatchFeedback("success", "Produto cadastrado com sucesso!");
        },
        onError: (error) => {
            // Dispara erro em caso de falha na criação do produto
            windowDispatchFeedback("error", error.message);
        }
    })

}
