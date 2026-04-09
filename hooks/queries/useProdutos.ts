import { getProdutos } from "@/api/produtoservico/routes";
import { useQuery } from "@tanstack/react-query";

export const useProdutos = () => {
    return useQuery({
        queryKey: ['produtos'],
        queryFn: getProdutos,
        staleTime: 1000 * 60 * 10
    })
}