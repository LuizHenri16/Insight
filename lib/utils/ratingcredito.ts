import { createClient } from "@/lib/supabase/client";
import { RatingCredito } from "@/utils/types/ratingcredito";

export async function getRatingCredito() {
    const supabase = createClient();
    const { data, error } = await supabase.from('RatingCredito').select('id_rating_credito, rating_credito');
    if (error) throw new Error(error.message);
    return data as RatingCredito[];
}