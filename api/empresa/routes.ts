import { createClient } from "@/lib/supabase/server";
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