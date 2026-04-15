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

export const getProdutoById = async (id: number): Promise<ProdutoServico> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('produtosservicos')
        .select('id_produtos_servicos, produto_servico')
        .eq('id_produtos_servicos', id)
        .single();

    if (error) throw new Error(error.message);

    return data as ProdutoServico;
}

export const updateProduto = async (id: number, produto: Partial<ProdutoServico>) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('produtosservicos')
        .update(produto)
        .eq('id_produtos_servicos', id);

    if (error) throw error;

    return data;
}