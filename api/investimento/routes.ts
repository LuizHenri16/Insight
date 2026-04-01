import { createClient } from "@/lib/supabase/client";
import { Investimento } from "@/utils/types/investimento";

export async function getInvestimento() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('Investimento')
        .select('id_investimento, investimento');

    if (error) throw new Error(error.message);

    return data as Investimento[];
}
