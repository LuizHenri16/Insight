import { useQuery } from "@tanstack/react-query"
import { getRatingCredito } from "@/api/ratingcredito/routes"

export const useRatingCredito = () => {
    return useQuery({
        queryKey: ["ratingCredito"],
        queryFn: getRatingCredito,
        staleTime: 1000 * 60 * 10,
    })
}