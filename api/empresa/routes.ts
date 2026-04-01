import { createClient } from "@/lib/supabase/client";
import { EmpresaForm } from "@/utils/types/Empresa";
import { NextResponse } from "next/server";

export async function POST(data: EmpresaForm) {
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
        return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
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
            const sociosFiltrados = data.Socio.filter((s: any) => s.nome_socio.trim() !== "");

            for (const socio of sociosFiltrados) {
                const { data: sData, error: sErr } = await supabase
                    .from('Socio')
                    .insert({ nome_socio: socio.nome_socio, cpfcnpj_socio: socio.cpfcnpj_socio })
                    .select().single();

                if (sErr) throw sErr;

                await supabase.from('EmpresaSocio').insert({ id_empresa, id_socio: sData.id_socio });
            }
        }

        // 3. Vincular Investimentos
        if (data.Investimentos?.length > 0) {

            const invData = data.Investimentos.map((inv: any) => ({
                id_empresa: id_empresa,
                id_investimento: inv.id_investimento
            }));

            const { error: invErr } = await supabase
                .from('EmpresaInvestimento')
                .insert(invData);

            if (invErr) throw invErr;
        }

        // 4. Vincular Produtos/Serviços
        if (data.ProdutosServicos?.length > 0) {
            const prodData = data.ProdutosServicos.map((prod: any) => ({
                id_empresa: id_empresa,
                id_produtos_servicos: prod.id_produtos_servicos
            }));

            const { error: prodErr } = await supabase
                .from('ProdutosServicosEmpresa')
                .insert(prodData);

            if (prodErr) throw prodErr;
        }

        return { success: true, id_empresa };

    } catch (error: any) {
        return { success: false, error: error.message, id_empresa: null };
    }
}

export async function getEmpresas(from: number, to: number, filterField?: string, filterValue?: string) {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user) return { data: null, count: 0, error: "Não autorizado" };

    // Query para a busca
    let query = supabase
        .from('Empresa')
        .select(`
            id_empresa, conta, nome_empresa, cnpj_empresa, email, crot,
            Socio (id_socio, nome_socio, cpfcnpj_socio)
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