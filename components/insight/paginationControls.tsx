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
                className="px-4 py-2 border border-input rounded-xl shadow-paper-sm disabled:opacity-50 text-foreground hover:bg-accent transition-all bg-card"
            >
                Anterior
            </button>
            <span className="flex items-center px-2 text-sm text-muted-foreground">Página {currentPage} de {totalPages}</span>
            <button
                disabled={currentPage >= totalPages}
                onClick={() => changePage(currentPage + 1)}
                className="px-4 py-2 border border-input rounded-xl shadow-paper-sm disabled:opacity-50 text-foreground hover:bg-accent transition-all bg-card"
            >
                Próximo
            </button>
        </>
    );
};
