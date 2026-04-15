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
        .select('id_rating_credito, rating_credito')
        .is('deletado_em', null);


    if (error) throw new Error(error.message);

    return data as RatingCredito[];
}

export const getRatingCreditoById = async (id: number): Promise<RatingCredito> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('ratingcredito')
        .select('id_rating_credito, rating_credito')
        .eq('id_rating_credito', id)
        .single();

    if (error) throw new Error(error.message);

    return data as RatingCredito;
}

export const updateRatingCredito = async (id: number, ratingCredito: Partial<RatingCredito>) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('ratingcredito')
        .update(ratingCredito)
        .eq('id_rating_credito', id);

    if (error) throw error;

    return data;
}

export const deleteRatingCredito = async (id: number) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('ratingcredito')
        .update({ deletado_em: new Date().toISOString() })
        .eq('id_rating_credito', id);

    if (error) throw error;

    return data;
}