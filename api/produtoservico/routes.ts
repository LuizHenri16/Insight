import { createClient } from "@/lib/supabase/client";
import { ProdutoServico } from "@/utils/types/produtoservico";

export const getProdutos = async (): Promise<ProdutoServico[]> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('ProdutosServicos')
        .select('id_produtos_servicos, produto_servico');

    if (error) throw new Error(error.message);

    return data as ProdutoServico[] || [];
}