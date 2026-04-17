import { useMutation, useQueryClient } from "@tanstack/react-query"
import { windowDispatchFeedback } from "@/components/insight/feedbackModal"
import { postProduto, updateProduto, deleteProduto } from "@/api/produtoservico/routes"


export const useProdutosMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        // Função que será chamada quando o mutation for executado
        // Vai cadastrar um novo produto no banco de dados
        mutationFn: postProduto,

        onSuccess: () => {
            // Invalida a query de 'produtos' para atualizar a lista com os novos dados
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

export const useUpdateProdutoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, produto }: { id: number, produto: string }) => updateProduto(id, { produto_servico: produto }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['produtos'] })
            windowDispatchFeedback("success", "Produto atualizado com sucesso!");
        },
        onError: (error) => {
            windowDispatchFeedback("error", error.message);
        }
    })
}

export const useDeleteProdutoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteProduto(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['produtos'] })
            windowDispatchFeedback("success", "Produto excluído com sucesso!");
        },
        onError: (error) => {
            windowDispatchFeedback("error", error.message);
        }
    })
}

