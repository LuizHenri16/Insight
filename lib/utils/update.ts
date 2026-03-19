import { EmpresaForm } from "@/utils/types/Empresa";
import { createClient } from "@/lib/supabase/client";

export async function update(id_empresa: number, data: EmpresaForm) {
    const supabase = createClient();

    // 1. Atualizar a tabela Empresa 
    const { error: empresaError } = await supabase
        .from('Empresa')
        .update({
            nome_empresa: data.nome_empresa,
            cnpj_empresa: data.cnpj_empresa,
            conta: data.conta,
            telefone: data.telefone,
            email: data.email,
            crot: data.crot,
            id_rating_credito: data.RatingCredito ? parseInt(data.RatingCredito) : null
        })
        .eq('id_empresa', id_empresa);

    if (empresaError) throw new Error("Erro ao atualizar Empresa: " + empresaError.message);

    // 2. Atualizar ou inserir os Sócios e garantir vínculo em EmpresaSocio
    // Limpar os vínculos existentes e refazer para simplificar, 
    // ou apenas atualizar os existentes se tiverem ID.
    if (data.Socio && data.Socio.length > 0) {
        // Obter os vínculos atuais para saber se precisamos deletar algum (opcional para limpar sujeira)
        
        for (const socio of data.Socio) {
            if (socio.nome_socio.trim() === "" && socio.cpfcnpj_socio.trim() === "") {
                continue;
            }

            if (socio.id_socio) {
                // Sócio já existe, apenas atualiza
                const { error: socioError } = await supabase
                    .from('Socio')
                    .update({
                        nome_socio: socio.nome_socio,
                        cpfcnpj_socio: socio.cpfcnpj_socio
                    })
                    .eq('id_socio', socio.id_socio);

                if (socioError) throw new Error("Erro ao atualizar Sócio: " + socioError.message);
            } else {
                // Sócio novo, insere e vincula
                const { data: insertedSocio, error: socioError } = await supabase
                    .from('Socio')
                    .insert({
                        nome_socio: socio.nome_socio,
                        cpfcnpj_socio: socio.cpfcnpj_socio
                    })
                    .select()
                    .single();

                if (socioError) throw new Error("Erro ao inserir Sócio: " + socioError.message);

                const { error: linkSocioError } = await supabase
                    .from('EmpresaSocio')
                    .insert({
                        id_empresa: id_empresa,
                        id_socio: insertedSocio.id_socio
                    });

                if (linkSocioError) throw new Error("Erro ao vincular Sócio: " + linkSocioError.message);
            }
        }
    }

    // 3. Atualizar Investimentos
    // Para simplificar: deletar todas as relações de investimentos para esta empresa e inserir as novas
    const { error: deleteInvError } = await supabase
        .from('EmpresaInvestimento')
        .delete()
        .eq('id_empresa', id_empresa);

    if (deleteInvError) throw new Error("Erro ao limpar Investimentos antigos: " + deleteInvError.message);

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

    // 4. Atualizar Produtos/Serviços
    const { error: deleteProdError } = await supabase
        .from('ProdutosServicosEmpresa')
        .delete()
        .eq('id_empresa', id_empresa);

    if (deleteProdError) throw new Error("Erro ao limpar Produtos/Serviços antigos: " + deleteProdError.message);

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
