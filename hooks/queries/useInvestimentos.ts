import { useQuery } from "@tanstack/react-query"
import { getInvestimento } from "@/api/investimento/routes"

export const useInvestimentos = () => {
    return useQuery({
        queryKey: ["investimentos"],
        queryFn: getInvestimento,
        staleTime: 1000 * 60 * 10,
    })
}