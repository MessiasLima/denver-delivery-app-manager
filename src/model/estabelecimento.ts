import { Cidade } from "./cidade";

export class Estabelecimento {
    static STATUS_ATIVO: string = "ATIVO";
    static STATUS_SUSPENSO: string = "SUSPENSO";
    
    id: number;
    nome: string;
    descricao: string;
    status: string;
    latitude: number;
    longitude: number;
    idCidade: number;
    urlImage: string;
    cidade: Cidade
}