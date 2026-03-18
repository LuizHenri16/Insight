import { createClient } from "../supabase/client";

export async function select(id: number | string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('Empresa')
        .select(`
            *,
            EmpresaSocio (
                Socio (*)
            ),
            ProdutosServicosEmpresa (
                ProdutosServicos (*)
            ),
            EmpresaInvestimento (
                Investimento (*)
            )
        `)
        .eq('id_empresa', id)
        .single();

    if (error) {
        console.error('Erro ao buscar a Empresa:', error);
        throw new Error(error.message);
    }

    return data;
}
