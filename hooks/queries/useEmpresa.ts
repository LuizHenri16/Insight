import { getEmpresas } from "@/api/empresa/routes";
import { useQuery } from "@tanstack/react-query";

export const useEmpresa = (from: number, to: number, filterField?: string, filterValue?: string) => {
    return useQuery({
        queryKey: ["empresa"],
        queryFn: () => getEmpresas(from, to, filterField, filterValue),
    });
}
