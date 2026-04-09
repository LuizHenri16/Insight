"use client"

import { useState, useEffect, useMemo, useCallback } from "react";
import { ActionButton } from "./actionButton";
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Loader } from "lucide-react";
import { getEmpresas } from "@/api/empresa/routes";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";

export const InsightTable = () => {
    const [data, setData] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const [filterField, setFilterField] = useState("nome_empresa");
    const [filterValue, setFilterValue] = useState("");
    const [activeFilter, setActiveFilter] = useState({ field: "", value: "" });

    const ITEMS_PER_PAGE = 10;

    // O useMemo serve para memorizar o range e evitar que ele seja recriado a cada renderização
    const range = useMemo(() => {
        const from = (currentPage - 1) * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;
        return { from, to };
    }, [currentPage]);

    // O useCallback serve para memorizar a função fetchData e evitar que ela seja recriada a cada renderização
    // Isso é importante para que o useEffect não seja chamado a cada renderização, evitando bugs
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getEmpresas(
                range.from,
                range.to,
                activeFilter.field,
                activeFilter.value
            );
            setData(response.data || []);
            setTotalCount(response.count || 0);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setIsLoading(false);
        }
    }, [range, activeFilter]);


    // Dispara a busca quando muda de página ou o filtro é inserido
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        setActiveFilter({ field: filterField, value: filterValue });
    };

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return (
        <div className="border border-gray-200 rounded-2xl shadow-xl bg-white p-4">
            <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-3 p-2 bg-gray-100 rounded-xl border border-gray-100">
                <select
                    value={filterField}
                    onChange={(e) => setFilterField(e.target.value)}
                    className="w-32 p-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
                    className="flex-1 min-w-[200px] p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button variant={"default"}>
                    <MagnifyingGlassIcon /> Pesquisar
                </Button>
            </form>
            <div className="flex flex-col gap-4 overflow-x-auto px-4 py-3 text-gray-800">
                <div className={isLoading ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="[&_th]:px-6 [&_th]:py-3 [&_th]:text-center [&_th]:text-xs [&_th]:font-medium [&_th]:text-gray-500 [&_th]:uppercase [&_th]:tracking-wider">
                            <tr>
                                <th>Empresa</th>
                                <th>CNPJ</th>
                                <th>Conta</th>
                                <th>Sócio 1</th>
                                <th>Sócio 2</th>
                                <th>Email</th>
                                <th>CROT</th>
                                <th aria-label="Ações"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading && (
                                <tr>
                                    <td colSpan={9} className="p-8 text-center animate-pulse">
                                        <Loader className="w-14 h-14 mx-auto mt-6 animate-spin" />
                                        <h3 className="mt-2 font-semibold text-gray-800">Carregando dados...</h3>
                                    </td>
                                </tr>
                            )}
                            {data.length === 0 && !isLoading ? (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center">
                                        <Image src="/assets/images/no-data-image.svg" alt="Vazio" width={138} height={138} className="mx-auto" />
                                        <h3 className="mt-2 font-semibold text-gray-800">Nenhum cadastro encontrado</h3>
                                        <p className="text-gray-500">Use a barra de pesquisa ou ajuste os filtros</p>
                                    </td>
                                </tr>
                            ) : (
                                data.map((item) => (
                                    <tr className="[&_td]:p-3 [&_td]:whitespace-nowrap text-center hover:bg-gray-50 transition-colors" key={item.id_empresa}>
                                        <td className="font-normal text-blue-950">{item.nome_empresa}</td>
                                        <td>{item.cnpj_empresa}</td>
                                        <td>{item.conta}</td>
                                        <td>{item.Socio?.[0]?.nome_socio || "-"}</td>
                                        <td>{item.Socio?.[1]?.nome_socio || "-"}</td>
                                        <td className="lowercase">{item.email}</td>
                                        <td>
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.crot === 'SIM' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {item.crot === 'SIM' ? 'Sim' : 'Não'}
                                            </span>
                                        </td>
                                        <td className="flex gap-1 justify-center items-center">
                                            <ActionButton type="view" idEmpresa={item.id_empresa} />
                                            <ActionButton type="edit" idEmpresa={item.id_empresa} />
                                            <ActionButton type="delete" idEmpresa={item.id_empresa} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-2 border-t border-gray-100"></div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
                <p className="text-sm text-gray-600">
                    Mostrando <strong>{range.from + 1}</strong> a <strong>{Math.min(range.to + 1, totalCount)}</strong> de <strong>{totalCount}</strong> cadastros
                </p>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                        Página {currentPage} de {totalPages || 1}
                    </span>
                    <div className="flex gap-2 text-sm font-medium">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1 || isLoading}
                            className="px-4 py-2 border border-gray-200 rounded-lg shadow-sm disabled:opacity-30 hover:bg-gray-50 active:scale-95 transition-all"
                        >
                            <ChevronLeftIcon />
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage >= totalPages || isLoading}
                            className="px-4 py-2 border border-gray-200 rounded-lg shadow-sm disabled:opacity-30 hover:bg-gray-50 active:scale-95 transition-all"
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}