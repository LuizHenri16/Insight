import { createClient } from "@/lib/supabase/server";
import { Empresa } from "@/utils/types/Empresa";

export const InsightTable = async () => {

    const supabase = await createClient();

    const { data: empresas } = await supabase
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
  `) as { data: Empresa[] | null };

    console.log(empresas)

    return (
        <div className="overflow-x-auto px-4 py-2 border border-gray-200 rounded-2xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="[&_th]:px-6 [&_th]:py-3 [&_th]:text-center [&_th]:text-xs [&_th]:font-medium [&_th]:text-gray-500 [&_th]:uppercase [&_th]:tracking-wider">
                    <tr>
                        <th>ID</th>
                        <th>CNPJ</th>
                        <th>Conta</th>
                        <th>empresa</th>
                        <th>sócio 1</th>
                        <th>sócio 2</th>
                        <th>email</th>
                        <th>crot</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {empresas === null || empresas?.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="p-2">Nenhuma empresa encontrada</td>
                        </tr>
                    ) : empresas?.map((empresa) => (
                        <tr className="[&_td]:p-2 [&_td]:whitespace-nowrap text-center" key={empresa.id_empresa}>
                            <td>{empresa.id_empresa}</td>
                            <td>{empresa.cnpj_empresa}</td>
                            <td>{empresa.conta}</td>
                            <td>{empresa.nome_empresa}</td>
                            <td>{empresa.Socio[0].nome_socio}</td>
                            <td>{empresa.Socio[1].nome_socio}</td>
                            <td>{empresa.email}</td>
                            <td>{empresa.crot === 'SIM' ? 'Sim' : 'Não'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}