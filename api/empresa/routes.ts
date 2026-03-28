import { createClient } from "@/lib/supabase/server";
import { EmpresaTable } from "@/utils/types/Empresa";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
        return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    const body = await request.json();

    try {
        // 1. Inserir Empresa
        const { data: empresa, error: empresaError } = await supabase
            .from('empresa')
            .insert({
                nome_empresa: body.nome_empresa,
                cnpj_empresa: body.cnpj_empresa,
                conta: body.conta,
                telefone: body.telefone,
                email: body.email,
                crot: body.crot,
                uuid_usuario: userData.user.id,
                id_rating_credito: body.RatingCredito ? parseInt(body.RatingCredito) : null
            })
            .select()
            .single();

        if (empresaError) throw new Error("Erro Empresa: " + empresaError.message);
        const id_empresa = empresa.id_empresa;

        // 2. Inserir Sócios
        if (body.Socio?.length > 0) {
            const sociosFiltrados = body.Socio.filter((s: any) => s.nome_socio.trim() !== "");

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
        if (body.Investimentos?.length > 0) {
            const invData = body.Investimentos.map((inv: any) => ({
                id_empresa: id_empresa,
                id_investimento: inv.id_investimento
            }));
            const { error: invErr } = await supabase.from('EmpresaInvestimento').insert(invData);
            if (invErr) throw invErr;
        }

        return NextResponse.json({ success: true, id_empresa });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 1. Função "Pura" de busca (Pode ser exportada para usar no Componente)
export async function getEmpresas(from: number, to: number) {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user) return { data: null, count: 0, error: "Unauthorized" };

    const { data, count, error } = await supabase
        .from('Empresa')
        .select(`
                id_empresa, conta, nome_empresa, cnpj_empresa, email, crot,
                Socio (id_socio, nome_socio, cpfcnpj_socio)
            `, { count: 'exact' })
        .is("deletado_em", null)
        .eq("uuid_usuario", userData.user.id)
        .range(from, to)
        .order('id_empresa', { ascending: true });

    return { data, count, error };
}

// 2. A Rota de API (Para chamadas externas ou do Client side)
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const from = Number(searchParams.get('from')) || 0;
    const to = Number(searchParams.get('to')) || 9;

    const { data, count, error } = await getEmpresas(from, to);

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json({ empresas: data, count });
}