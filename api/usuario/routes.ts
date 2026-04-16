import { createClient } from "@/lib/supabase/client";

export async function getUserRole() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        const { data } = await supabase
        .from('profiles')
        .select('role')
            .eq('id', user.id)
            .single();
                
        if (data) {
            return data.role ;
        }
    }
}