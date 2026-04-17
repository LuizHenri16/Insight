import { createClient } from "@/lib/supabase/client";
import { Investimento } from "@/utils/types/investimento";


export const postInvestimento = async (investimento: Partial<Investimento>) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('investimento')
        .insert([investimento])

    if (error) throw error
    return data
}

export const getInvestimento = async (): Promise<Investimento[]> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('investimento')
        .select('id_investimento, investimento')
        .is('deletado_em', null);


    if (error) throw new Error(error.message);

    return data as Investimento[] || [];
}

export const getInvestimentoById = async (id: number): Promise<Investimento> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('investimento')
        .select('id_investimento, investimento')
        .eq('id_investimento', id)
        .single();

    if (error) throw new Error(error.message);

    return data as Investimento;
}

export const updateInvestimento = async (id: number, investimento: Partial<Investimento>) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('investimento')
        .update(investimento)
        .eq('id_investimento', id);

    if (error) throw error;

    return data;
}

export const deleteInvestimento = async (id: number) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('investimento')
        .update({ deletado_em: new Date().toISOString() })
        .eq('id_investimento', id);

    if (error) throw error;

    return data;
}

