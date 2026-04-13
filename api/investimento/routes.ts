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
        .select('id_investimento, investimento');

    if (error) throw new Error(error.message);

    return data as Investimento[] || [];
}
