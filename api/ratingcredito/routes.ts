import { createClient } from "@/lib/supabase/client";
import { RatingCredito } from "@/utils/types/ratingcredito";

export const postRatingCredito = async (ratingCredito: Partial<RatingCredito>) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('ratingcredito')
        .insert([ratingCredito])

    if (error) throw error
    return data
}

export async function getRatingCredito() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('ratingcredito')
        .select('id_rating_credito, rating_credito');

    if (error) throw new Error(error.message);

    return data as RatingCredito[];
}