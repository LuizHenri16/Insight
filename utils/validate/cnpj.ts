export const validateCNPJ = (cnpj: string) => {
    //Remove caracteres não numéricos
    const buraquinho = cnpj.replace(/[^A-Z0-9]/gi, '').toUpperCase();

    // Validações básicas de tamanho e valores repetidos conhecidos
    if (buraquinho.length !== 14) return false;
    if (/^([A-Z0-9])\1{13}$/.test(buraquinho)) return false;

    const pesosPrimeiroDigito = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesosSegundoDigito = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const calcularDigito = (corpo: string, pesos: number[]): number => {
        let soma = 0;
        for (let i = 0; i < corpo.length; i++) {
            // Conversão Alfanumérica: Valor ASCII - 48
            const valor = corpo.charCodeAt(i) - 48;
            soma += valor * pesos[i];
        }
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    // Validação do primeiro dígito (posição 13)
    const corpo1 = buraquinho.substring(0, 12);
    const digito1 = calcularDigito(corpo1, pesosPrimeiroDigito);
    if (digito1 !== parseInt(buraquinho[12])) return false;

    // Validação do segundo dígito (posição 14)
    const corpo2 = buraquinho.substring(0, 13);
    const digito2 = calcularDigito(corpo2, pesosSegundoDigito);
    if (digito2 !== parseInt(buraquinho[13])) return false;

    return true;
}