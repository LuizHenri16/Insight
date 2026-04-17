import { getProdutos } from "@/api/produtoservico/routes";
import { useQuery } from "@tanstack/react-query";

export const useProdutos = () => {
    return useQuery({
        // Chave única da query
        queryKey: ['produtos'],

        // Função que será chamada quando a query for executada
        queryFn: getProdutos,

        // Tempo de cache
        staleTime: 1000 * 60 * 10
    })
}