import { windowDispatchFeedback } from "@/components/insight/feedbackModal";
import { EmpresaForm } from "../types/Empresa";
import { validateCNPJ } from "./cnpj";

export const validateForm = (formData: EmpresaForm) => {
    if (!formData.nome_empresa || !formData.cnpj_empresa || !formData.conta) {
        windowDispatchFeedback("warning", "Preencha os campos obrigatórios: Nome, CNPJ e Conta.");
        return false;
    }

    if (!validateCNPJ(formData.cnpj_empresa)) {
        windowDispatchFeedback("warning", "CNPJ da empresa inválido.");
        return false;
    }

    if (!formData.Socio[0].nome_socio || !formData.Socio[0].cpfcnpj_socio) {
        windowDispatchFeedback("warning", "Preencha os campos obrigatórios: Nome e CPF/CNPJ do sócio 1.");
        return false;
    }

    if (!formData.Socio[1].nome_socio || !formData.Socio[1].cpfcnpj_socio) {
        windowDispatchFeedback("warning", "Preencha os campos obrigatórios: Nome e CPF/CNPJ do sócio 2.");
        return false;
    }

    if (!formData.Investimentos || formData.Investimentos.length === 0) {
        windowDispatchFeedback("warning", "Preencha os campos obrigatórios: Investimentos.");
        return false;
    }

    if (!formData.ProdutosServicos || formData.ProdutosServicos.length === 0) {
        windowDispatchFeedback("warning", "Preencha os campos obrigatórios: Produtos/Serviços.");
        return false;
    }

    if (!formData.RatingCredito) {
        windowDispatchFeedback("warning", "Preencha os campos obrigatórios: Rating de Crédito.");
        return false;
    }

    return true;
}