import { createClient } from "@/lib/supabase/client";
import { EmpresaForm } from "@/utils/types/Empresa";
import { Investimento } from "@/utils/types/investimento";
import { ProdutoServico } from "@/utils/types/produtoservico";
import { Socio } from "@/utils/types/Socio";

export async function POST(data: EmpresaForm) {
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
        return { success: false, id_empresa: 0, error: "Usuário não autenticado" };
    }

    try {
        // 1. Inserir Empresa
        const { data: empresa, error: empresaError } = await supabase
            .from('empresa')
            .insert({
                nome_empresa: data.nome_empresa,
                cnpj_empresa: data.cnpj_empresa,
                conta: data.conta,
                telefone: data.telefone,
                email: data.email,
                crot: data.crot,
                uuid_usuario: userData.user.id,
                id_rating_credito: data.RatingCredito ? parseInt(data.RatingCredito) : null
            })
            .select()
            .single();

        if (empresaError) throw new Error("Erro Empresa: " + empresaError.message);
        const id_empresa = empresa.id_empresa;

        // 2. Inserir Sócios
        if (data.Socio?.length > 0) {
            const sociosParaInserir = data.Socio
                .filter((socio: Socio) => socio.nome_socio.trim() !== "")
                .map((socio: Socio) => ({
                    nome_socio: socio.nome_socio,
                    cpfcnpj_socio: socio.cpfcnpj_socio.replace(".", "").replace(".", "").replace("/", "").replace("-", "")
                }));

            if (sociosParaInserir.length > 0) {
                const { data: sDatas, error: sErr } = await supabase
                    .from('socio')
                    .insert(sociosParaInserir)
                    .select('id_socio');

                if (sErr) throw sErr;

                const vinculoSocios = sDatas.map(s => ({
                    id_empresa,
                    id_socio: s.id_socio
                }));

                const { error: relErr } = await supabase
                    .from('empresasocio')
                    .insert(vinculoSocios);

                if (relErr) throw relErr;
            }
        }

        // 3. Vincular Investimentos
        if (data.Investimentos?.length > 0) {

            const invData = data.Investimentos.map((investimento: Investimento) => ({
                id_empresa: id_empresa,
                id_investimento: investimento.id_investimento
            }));

            const { error: invErr } = await supabase
                .from('empresainvestimento')
                .insert(invData);

            if (invErr) throw invErr;
        }

        if (data.ProdutosServicos?.length > 0) {
            const validProds = data.ProdutosServicos
                .filter((produto: ProdutoServico) => produto.id_produtos_servicos)
                .map((produto: ProdutoServico) => ({
                    id_empresa: Number(id_empresa),
                    id_produtos_servicos: Number(produto.id_produtos_servicos)
                }));

            if (validProds.length > 0) {
                const { error: prodErr } = await supabase
                    .from('produtosservicosempresa')
                    .insert(validProds);

                if (prodErr) throw new Error("Erro nos Produtos: " + prodErr.message);
            }
        }

        return { success: true, id_empresa, error: "" };

    // unknown é o tipo mais seguro para erros, pois pode ser qualquer coisa. Ao usar (error as Error).message, estamos assumindo que o erro é um objeto do tipo Error, o que é uma prática comum, mas não garantida. Se o erro não for um objeto Error, isso pode resultar em undefined ou em outro comportamento inesperado.
    } catch (error: unknown) {
        return { success: false, error: (error as Error).message, id_empresa: null };
    }
}

export async function getEmpresas(from: number, to: number, filterField?: string, filterValue?: string) {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user) return { data: null, count: 0, error: "Não autorizado" };

    // Query para a busca
    let query = supabase
        .from('empresa')
        .select(`
            id_empresa, conta, nome_empresa, cnpj_empresa, email, crot,
            socio (id_socio, nome_socio, cpfcnpj_socio)
        `, { count: 'exact' })
        .is("deletado_em", null)
        .eq("uuid_usuario", userData.user.id);

    // Aplicar filtro caso necessário
    if (filterField && filterValue) {
        query = query.ilike(filterField, `%${filterValue}%`);
    }

    const { data, count, error } = await query
        .range(from, to)
        .order('id_empresa', { ascending: true });

    return { data, count, error };
}