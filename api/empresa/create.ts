import { EmpresaForm } from "@/utils/types/Empresa";
import { POST } from "./routes";

export interface ResponseCreateEmpresa {
    success: boolean;
    id_empresa: number;
    error: string | undefined;
}

export async function save(data: EmpresaForm) {
    const response: Response | any = await POST(data);

    if (!response.success) {
        throw new Error(response.error);
    }

    return response.id_empresa;
}