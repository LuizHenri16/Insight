import { EmpresaForm } from "@/utils/types/Empresa";
import { createClient } from "@/lib/supabase/client";

export async function save(data: EmpresaForm) {
    const supabase = createClient();

    // 1. Obter o usuário da sessão para vincular no cadastro
    // Necessário para que usuários permitidos possam cadastrar empresas e também servirá para futuras implementações
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
        throw new Error("Usuário não autenticado");
    }
    const id_usuario = userData.user.id;

    // 2. Inserir na tabela Empresa 
    const { data: empresaData, error: empresaError } = await supabase
        .from('Empresa')
        .insert({
            nome_empresa: data.nome_empresa,
            cnpj_empresa: data.cnpj_empresa,
            conta: data.conta,
            telefone: data.telefone,
            email: data.email,
            crot: data.crot,
            uuid_usuario: id_usuario,
            id_rating_credito: data.RatingCredito ? parseInt(data.RatingCredito) : null
        })
        .select()
        .single();

    if (empresaError) throw new Error("Erro ao inserir Empresa: " + empresaError.message);
    const id_empresa = empresaData.id_empresa;

    // 3. Inserir os Sócios e vincular em EmpresaSocio
    if (data.Socio && data.Socio.length > 0) {
        const sociosInserir = data.Socio.filter(s => s.nome_socio.trim() !== "" || s.cpfcnpj_socio.trim() !== "");

        // Loop para inseir os sócios com base nos dados do formulário
        for (const socio of sociosInserir) {
            // Inserir Sócio
            const { data: insertedSocio, error: socioError } = await supabase
                .from('Socio')
                .insert({
                    nome_socio: socio.nome_socio,
                    cpfcnpj_socio: socio.cpfcnpj_socio
                })
                .select()
                .single();

            if (socioError) throw new Error("Erro ao inserir Sócio: " + socioError.message);

            // Vincular na tabela EmpresaSocio
            const { error: linkSocioError } = await supabase
                .from('EmpresaSocio')
                .insert({
                    id_empresa: id_empresa,
                    id_socio: insertedSocio.id_socio
                });

            if (linkSocioError) throw new Error("Erro ao vincular Sócio: " + linkSocioError.message);
        }
    }

    // 4. Vincular Investimentos
    if (data.Investimentos && data.Investimentos.length > 0) {
        for (const inv of data.Investimentos) {
            const { error: invError } = await supabase
                .from('EmpresaInvestimento')
                .insert({
                    id_empresa: id_empresa,
                    id_investimento: inv.id_investimento
                });
            if (invError) throw new Error("Erro ao vincular Investimento: " + invError.message);
        }
    }

    // 5. Vincular Produtos/Serviços
    if (data.ProdutosServicos && data.ProdutosServicos.length > 0) {
        for (const prod of data.ProdutosServicos) {
            const { error: prodError } = await supabase
                .from('ProdutosServicosEmpresa')
                .insert({
                    id_empresa: id_empresa,
                    id_produtos_servicos: prod.id_produto_servico
                });
            if (prodError) throw new Error("Erro ao vincular Produto/Serviço: " + prodError.message);
        }
    }

    return true;
}