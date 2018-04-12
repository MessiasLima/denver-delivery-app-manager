import { TipoProduto } from "./tipo-produto";

export class Produto{
    id?: number;
    nome?: string;
    descricao?: string;
    idEstabelecimento?: number;
    idTipoProduto?: number;
    tipoProduto?: TipoProduto;
    valor?: number;
    imagem?: string;
}