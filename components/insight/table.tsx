
import { createClient } from "@/lib/supabase/server";
import { EmpresaTable } from "@/utils/types/Empresa";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ActionButton } from "./actionButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { GET, getEmpresas } from "@/api/empresa/routes";

interface Props {
    searchParams: Promise<{ page?: string }>;
}

export const InsightTable = async ({ searchParams }: Props) => {

    // 1. Configuração da Paginação
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const itemsPerPage = 10;

    // Cálculo do intervalo para o Supabase (.range)
    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    // Buscar dados
    const response = await getEmpresas(from, to);

    const { data, count, error } = response;

    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    return (
        <div className="overflow-x-auto px-4 py-2 border border-gray-200 rounded-2xl shadow-md bg-white text-gray-800">
            <table className="w-full divide-y divide-gray-200">
                <thead className="[&_th]:px-6 [&_th]:py-3 [&_th]:text-center [&_th]:text-xs [&_th]:font-medium [&_th]:text-gray-500 [&_th]:uppercase [&_th]:tracking-wider">
                    <tr>
                        <th>ID</th>
                        <th>CNPJ</th>
                        <th>Conta</th>
                        <th>Empresa</th>
                        <th>Sócio 1</th>
                        <th>Sócio 2</th>
                        <th>Email</th>
                        <th>CROT</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(!data || data.length === 0) ? (
                        <tr>
                            <td colSpan={8} className="p-8 text-center text-gray-500 italic">
                                Nenhum cadastro encontrado
                            </td>
                        </tr>
                    ) : (
                        data.map((data) => (
                            <tr className="[&_td]:p-3 [&_td]:whitespace-nowrap text-center hover:bg-gray-50 transition-colors" key={data.id_empresa}>
                                <td className="font-mono text-xs">{data.id_empresa}</td>
                                <td>{data.cnpj_empresa}</td>
                                <td>{data.conta}</td>
                                <td className="font-normal text-blue-950">{data.nome_empresa}</td>
                                <td>{data.Socio?.[0]?.nome_socio || "-"}</td>
                                <td>{data.Socio?.[1]?.nome_socio || "-"}</td>
                                <td className="lowercase">{data.email}</td>
                                <td>
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${data.crot === 'SIM' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {data.crot === 'SIM' ? 'Sim' : 'Não'}
                                    </span>
                                </td>
                                <td className="flex gap-1 justify-center items-center">
                                    <ActionButton type="view" idEmpresa={data.id_empresa} />
                                    <ActionButton type="edit" idEmpresa={data.id_empresa} />
                                    <ActionButton type="delete" idEmpresa={data.id_empresa} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="mt-2 border-t border-gray-100"></div>
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
                <p className="text-sm text-gray-600">
                    Mostrando <strong>{from + 1}</strong> a <strong>{Math.min(to + 1, totalCount)}</strong> de <strong>{totalCount}</strong> cadastros
                </p>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                        Página {currentPage} de {totalPages}
                    </span>
                    <div className="flex gap-2 text-sm font-medium">
                        <Link href={hasPrevPage ? `?page=${currentPage - 1}` : "#"} className={`px-4 py-2 border border-gray-200 rounded-lg shadow-sm transition-all ${!hasPrevPage ? "opacity-30 cursor-not-allowed pointer-events-none" : "hover:bg-gray-50 active:scale-95"}`}>
                            <ChevronLeftIcon />
                        </Link>
                        <Link href={hasNextPage ? `?page=${currentPage + 1}` : "#"} className={`px-4 py-2 border border-gray-200 rounded-lg shadow-sm transition-all ${!hasNextPage ? "opacity-30 cursor-not-allowed pointer-events-none" : "hover:bg-gray-50 active:scale-95"}`}>
                            <ChevronRightIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}