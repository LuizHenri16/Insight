export interface Empresa {
    id_empresa: number;
    conta: string;
    nome_empresa: string;
    cnpj_empresa: string;
    email: string;
    crot: string;
    Socio: {
        id_socio: number;
        nome_socio: string;
        cpfcnpj_socio: string;
    }[];
}