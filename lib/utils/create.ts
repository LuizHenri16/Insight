import { EmpresaForm } from "@/utils/types/Empresa";

export async function save(data: EmpresaForm) {
    const response = await fetch("/api/empresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao salvar os dados.");
    }

    return true;
}