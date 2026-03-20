import { createClient } from "../supabase/client";
import { windowDispatchFeedback } from "@/components/insight/feedbackModal";

export async function deleteEmpresa(idEmpresa: number) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
        .from('Empresa')
        .update({ deletado_em: new Date() })
        .eq('id_empresa', idEmpresa)
        .eq('uuid_usuario', user?.id);

    if (error) {
        windowDispatchFeedback("error", 'Erro ao excluir empresa: ' + error.message);
    }

    if (!error) {
        windowDispatchFeedback("success", "Empresa excluída com sucesso!");
    }
}
