"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const PaginationControls = ({ currentPage, totalPages }: { currentPage: number, totalPages: number }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <>
            <button
                disabled={currentPage <= 1}
                onClick={() => changePage(currentPage - 1)}
                className="p-2 border border-gray-200 dark:border-zinc-600 rounded-lg disabled:opacity-50 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
            >
                Anterior
            </button>
            <span className="flex items-center px-2">Página {currentPage} de {totalPages}</span>
            <button
                disabled={currentPage >= totalPages}
                onClick={() => changePage(currentPage + 1)}
                className="p-2 border border-gray-200 dark:border-zinc-600 rounded-lg disabled:opacity-50 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
            >
                Próximo
            </button>
        </>
    );
};