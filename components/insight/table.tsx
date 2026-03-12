import { createClient } from "@/lib/supabase/server";
import { Empresa } from "@/utils/types/Empresa";
import Link from "next/link";

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

    const supabase = await createClient();

    // 2. Busca de dados com 'count' exato para saber o total de páginas
    const { data: empresas, count, error } = await supabase
        .from('Empresa')
        .select(`
            id_empresa,
            conta,
            nome_empresa,
            cnpj_empresa,
            email,
            crot,
            Socio (
                id_socio,
                nome_socio,
                cpfcnpj_socio
            )
        `, { count: 'exact' })
        .range(from, to)
        .order('id_empresa', { ascending: true }) as { data: Empresa[] | null, count: number | null, error: any };

    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    return (
        <div className="overflow-x-auto px-4 py-2 border border-gray-200 rounded-2xl shadow-md bg-white text-gray-800">
            <table className="min-w-full divide-y divide-gray-200">
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
                        <th>s</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(!empresas || empresas.length === 0) ? (
                        <tr>
                            <td colSpan={8} className="p-8 text-center text-gray-400 italic">
                                Nenhuma empresa encontrada
                            </td>
                        </tr>
                    ) : (
                        empresas.map((empresa) => (
                            <tr className="[&_td]:p-3 [&_td]:whitespace-nowrap text-center hover:bg-gray-50 transition-colors" key={empresa.id_empresa}>
                                <td className="font-mono text-xs">{empresa.id_empresa}</td>
                                <td>{empresa.cnpj_empresa}</td>
                                <td>{empresa.conta}</td>
                                <td className="font-semibold text-blue-600 text-left">{empresa.nome_empresa}</td>
                                <td>{empresa.Socio?.[0]?.nome_socio || "-"}</td>
                                <td>{empresa.Socio?.[1]?.nome_socio || "-"}</td>
                                <td className="lowercase">{empresa.email}</td>
                                <td>
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${empresa.crot === 'SIM' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {empresa.crot === 'SIM' ? 'Sim' : 'Não'}
                                    </span>
                                </td>
                                <td>
                                    {/* Espaço para o botão de editar / visualizar / deletar */}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="mt-2 border-t border-gray-100"></div>
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
                <p className="text-sm text-gray-600">
                    Mostrando <strong>{from + 1}</strong> a <strong>{Math.min(to + 1, totalCount)}</strong> de <strong>{totalCount}</strong> empresas
                </p>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                        Página {currentPage} de {totalPages}
                    </span>
                    <div className="flex gap-2 text-sm font-medium">
                        {/* Botão Anterior */}
                        <Link
                            href={hasPrevPage ? `?page=${currentPage - 1}` : "#"}
                            className={`px-4 py-2 border border-gray-200 rounded-lg shadow-sm transition-all ${!hasPrevPage ? "opacity-30 cursor-not-allowed pointer-events-none" : "hover:bg-gray-50 active:scale-95"
                                }`}
                        >
                            Anterior
                        </Link>

                        {/* Botão Próximo */}
                        <Link
                            href={hasNextPage ? `?page=${currentPage + 1}` : "#"}
                            className={`px-4 py-2 border border-gray-200 rounded-lg shadow-sm transition-all ${!hasNextPage ? "opacity-30 cursor-not-allowed pointer-events-none" : "hover:bg-gray-50 active:scale-95"
                                }`}
                        >
                            Próximo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}