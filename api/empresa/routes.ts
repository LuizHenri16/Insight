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
            .from('Empresa')
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
                .filter((s: any) => s.nome_socio.trim() !== "")
                .map((s: any) => ({
                    nome_socio: s.nome_socio,
                    cpfcnpj_socio: s.cpfcnpj_socio
                }));

            if (sociosParaInserir.length > 0) {
                const { data: sDatas, error: sErr } = await supabase
                    .from('Socio')
                    .insert(sociosParaInserir)
                    .select('id_socio');

                if (sErr) throw sErr;

                const vinculoSocios = sDatas.map(s => ({
                    id_empresa,
                    id_socio: s.id_socio
                }));

                const { error: relErr } = await supabase
                    .from('EmpresaSocio')
                    .insert(vinculoSocios);
                if (relErr) throw relErr;
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

        if (data.ProdutosServicos?.length > 0) {
            const validProds = data.ProdutosServicos
                .filter((p: any) => p.id_produtos_servicos)
                .map((prod: any) => ({
                    id_empresa: id_empresa,
                    id_produtos_servicos: prod.id_produtos_servicos
                }));

            if (validProds.length > 0) {
                const { error: prodErr } = await supabase
                    .from('ProdutosServicosEmpresa')
                    .insert(validProds);

                if (prodErr) throw new Error("Erro nos Produtos: " + prodErr.message);
            }
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