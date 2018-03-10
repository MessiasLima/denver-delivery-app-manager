export class Usuario {

    static TIPO_FUNCIONARIO: string = "FUNCIONARIO";
    static TIPO_ADM_ESTABELECIMENTO: string = "ADM_ESTABELECIMENTO";
    static TIPO_ADM_SISTEMA = "ADM_SISTEMA";

    email: string;
    id: number;
    login: string;
    nome: string;
    tipo: string;
    token: string;
    senha: string;
}