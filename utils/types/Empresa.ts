export interface EmpresaTable {
    id_empresa: number;
    conta: string;
    nome_empresa: string;
    cnpj_empresa: string;
    email: string;
    telefone: string;
    crot: string;
    Socio: {
        id_socio: number;
        nome_socio: string;
        cpfcnpj_socio: string;
    }[],
    Investimentos: {
        id_investimento: number;
        investimento: string;
    }[],
    ProdutosServicos: {
        id_produtos_servicos: number;
        produto_servico: string;
    }[],
    id_rating_credito: number;

}

export interface EmpresaQueryResult {
    id_empresa: number;
    conta: string;
    nome_empresa: string;
    cnpj_empresa: string;
    email: string;
    crot: string;
    socio: {
        id_socio: number;
        nome_socio: string;
        cpfcnpj_socio: string;
    }[];
}

export interface EmpresaJoin {
    id_empresa: number;
    conta: string;
    nome_empresa: string;
    cnpj_empresa: string;
    email: string;
    telefone: string;
    crot: string;
    EmpresaSocio?: {
        Socio: {
            id_socio: number;
            nome_socio: string;
            cpfcnpj_socio: string;
        };
    }[];
    EmpresaInvestimento?: {
        Investimento: {
            id_investimento: number;
            investimento: string;
        };
    }[];
    ProdutosServicosEmpresa?: {
        ProdutosServicos: {
            id_produtos_servicos: number;
            produto_servico: string;
        };
    }[];
    id_rating_credito?: number;
}

export interface EmpresaInvestimentoItem {
    Investimento: {
        id_investimento: number;
        investimento: string;
    };
}

export interface ProdutosServicosEmpresaItem {
    ProdutosServicos: {
        id_produtos_servicos: number;
        produto_servico: string;
    };
}

export interface EmpresaForm {
    id_empresa?: number;
    nome_empresa: string;
    cnpj_empresa: string;
    conta: string;
    telefone: string;
    email: string;
    crot: string;
    Socio: {
        id_socio?: number;
        nome_socio: string;
        cpfcnpj_socio: string;
    }[];
    Investimentos: {
        investimento: string;
        id_investimento: number;
    }[];
    ProdutosServicos: {
        produto_servico: string;
        id_produto_servico: number;
    }[];
    RatingCredito: string;
}