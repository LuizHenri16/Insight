import { getEmpresas } from "@/api/empresa/routes";
import { useQuery } from "@tanstack/react-query";

export const useEmpresa = (from: number, to: number, filterField?: string, filterValue?: string) => {
    return useQuery({
        // Chave única da query
        queryKey: ["empresa"],

        // Função que será chamada quando a query for executada
        queryFn: () => getEmpresas(from, to, filterField, filterValue),
        // Tempo de cache
        staleTime: 1000 * 60 * 15,
    });
}
