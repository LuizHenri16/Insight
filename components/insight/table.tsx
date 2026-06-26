"use client"

import { useState, useMemo } from "react";
import { ActionButton } from "./actionButton";
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { useEmpresa } from "@/hooks/queries/useEmpresa";
import { EmpresaQueryResult } from "@/utils/types/Empresa";
import { TableSkeleton } from "./skeletons";

export const InsightTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterField, setFilterField] = useState("nome_empresa");
    const [filterValue, setFilterValue] = useState("");
    const [activeFilter, setActiveFilter] = useState({ field: "", value: "" });

    const ITEMS_PER_PAGE = 10;

    const range = useMemo(() => {
        const from = (currentPage - 1) * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;
        return { from, to };
    }, [currentPage]);

    const { data: response, isLoading, isPlaceholderData } = useEmpresa(
        range.from,
        range.to,
        activeFilter.field,
        activeFilter.value
    );

    const data: EmpresaQueryResult[] = response?.data || [];
    const totalCount = response?.count || 0;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        setActiveFilter({ field: filterField, value: filterValue });
    };

    return (
        <div className="paper-card rounded-2xl p-0 overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-border">
                <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <select
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value)}
                        className="w-28 sm:w-32 p-2.5 bg-card text-foreground border border-input rounded-xl text-sm outline-none focus:ring-2 focus:ring-ring cursor-pointer paper-input"
                    >
                        <option value="nome_empresa">Empresa</option>
                        <option value="cnpj_empresa">CNPJ</option>
                        <option value="email">Email</option>
                        <option value="conta">Conta</option>
                    </select>

                    <Input
                        type="text"
                        placeholder="Filtro da busca..."
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="flex-1 min-w-[140px] sm:min-w-[200px]"
                    />
                    <Button variant={"default"} type="submit" size="sm" className="w-full sm:w-auto">
                        <MagnifyingGlassIcon /> Pesquisar
                    </Button>
                </form>
            </div>

            <div className="overflow-x-auto">
                <div className={isLoading || isPlaceholderData ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-secondary/60">
                                <th className="px-3 sm:px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Empresa</th>
                                <th className="px-3 sm:px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">CNPJ</th>
                                <th className="hidden sm:table-cell px-3 sm:px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Conta</th>
                                <th className="hidden md:table-cell px-3 sm:px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sócio 1</th>
                                <th className="hidden md:table-cell px-3 sm:px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sócio 2</th>
                                <th className="hidden sm:table-cell px-3 sm:px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                                <th className="px-3 sm:px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">CROT</th>
                                <th className="px-3 sm:px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider" aria-label="Ações"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {isLoading ? (
                                <TableSkeleton rows={5} cols={8} />
                            ) : data.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="p-8 sm:p-12 text-center">
                                        <div className="flex flex-col items-center gap-3 py-4">
                                            <div className="bg-secondary/50 p-4 rounded-full">
                                                <Image src="/assets/images/no-data-image.svg" alt="Vazio" width={80} height={80} className="opacity-60" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-foreground">Nenhum cadastro encontrado</h3>
                                                <p className="text-muted-foreground text-sm mt-1">Use a barra de pesquisa ou ajuste os filtros</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                data.map((item: EmpresaQueryResult, index: number) => (
                                    <tr
                                        key={item.id_empresa}
                                        className={`[&_td]:p-3 sm:[&_td]:p-4 [&_td]:whitespace-nowrap text-center transition-colors hover:bg-accent/30 ${index % 2 === 0 ? 'bg-card' : 'bg-secondary/10'}`}
                                    >
                                        <td className="font-medium text-foreground max-w-[120px] sm:max-w-none truncate sm:truncate-none">{item.nome_empresa}</td>
                                        <td className="text-muted-foreground font-mono text-xs sm:text-sm">{item.cnpj_empresa}</td>
                                        <td className="hidden sm:table-cell text-muted-foreground">{item.conta}</td>
                                        <td className="hidden md:table-cell text-muted-foreground">{item.socio?.[0]?.nome_socio || <span className="text-muted-foreground/40">-</span>}</td>
                                        <td className="hidden md:table-cell text-muted-foreground">{item.socio?.[1]?.nome_socio || <span className="text-muted-foreground/40">-</span>}</td>
                                        <td className="hidden sm:table-cell lowercase text-muted-foreground max-w-[150px] truncate">{item.email}</td>
                                        <td>
                                            <span className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium ${
                                                item.crot === 'SIM'
                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                    : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                                            }`}>
                                                {item.crot === 'SIM' ? 'Sim' : 'Não'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex gap-1 justify-center items-center">
                                                <ActionButton type="view" idEmpresa={item.id_empresa} />
                                                <ActionButton type="edit" idEmpresa={item.id_empresa} />
                                                <ActionButton type="delete" idEmpresa={item.id_empresa} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center p-3 sm:p-4 gap-3 border-t border-border bg-secondary/20">
                <p className="text-sm text-muted-foreground text-center sm:text-left">
                    Mostrando <strong className="text-foreground">{range.from + 1}</strong> a <strong className="text-foreground">{Math.min(range.to + 1, totalCount)}</strong> de <strong className="text-foreground">{totalCount}</strong> cadastros
                </p>

                <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-sm text-muted-foreground">
                        Página {currentPage} de {totalPages || 1}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1 || isLoading}
                            className="px-3 sm:px-4 py-2 border border-input rounded-xl shadow-paper-sm disabled:opacity-30 hover:bg-accent transition-all bg-card text-foreground text-sm"
                            aria-label="Página anterior"
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage >= totalPages || isLoading}
                            className="px-3 sm:px-4 py-2 border border-input rounded-xl shadow-paper-sm disabled:opacity-30 hover:bg-accent transition-all bg-card text-foreground text-sm"
                            aria-label="Próxima página"
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
