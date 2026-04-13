import { createClient } from "@/lib/supabase/client";
import { ProdutoServico } from "@/utils/types/produtoservico";

export const postProduto = async (produto: Partial<ProdutoServico>) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('produtosservicos')
        .insert([produto])

    if (error) throw error
    return data
}

export const getProdutos = async (): Promise<ProdutoServico[]> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('produtosservicos')
        .select('id_produtos_servicos, produto_servico');

    if (error) throw new Error(error.message);

    return data as ProdutoServico[] || [];
}