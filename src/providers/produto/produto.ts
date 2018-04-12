import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
import { Estabelecimento } from '../../model/estabelecimento';
import { TipoProduto } from '../../model/tipo-produto';
import { Produto } from '../../model/produto';


@Injectable()
export class ProdutoProvider {

	ENDPOINT_TIPO_PRODUTO: string;
	ENDPOINT_PRODUTO: string;
	ENDPOINT_PRODUTO_ESTABELECIMENTO: string;
	ENDPOINT_TIPO_PRODUTO_ESTABELECIMENTO: string;

	constructor(
		public http: HttpClient,
		public commonsProvider: CommonsProvider
	) {
		this.ENDPOINT_PRODUTO = commonsProvider.getHost() + "/produto";
		this.ENDPOINT_PRODUTO_ESTABELECIMENTO = this.ENDPOINT_PRODUTO + "/estabelecimento";
		this.ENDPOINT_TIPO_PRODUTO = this.ENDPOINT_PRODUTO + "/tipo";
		this.ENDPOINT_TIPO_PRODUTO_ESTABELECIMENTO = this.ENDPOINT_TIPO_PRODUTO + "/estabelecimento";
	}

	obterTipoProdutosPorEstabelecimento(estabelecimento: Estabelecimento) {
		return this.http.get<TipoProduto>(
			this.ENDPOINT_TIPO_PRODUTO_ESTABELECIMENTO + "/" + estabelecimento.id,
			this.commonsProvider.getCommonHeaders()
		);
	}

	salvarTipoProduto(tipoProduto: TipoProduto) {
		return this.http.post(
			this.ENDPOINT_TIPO_PRODUTO,
			tipoProduto,
			this.commonsProvider.getPayloadHeaders()
		);
	}

	obterProdutosPorEstabelecimento(estabelecimento: Estabelecimento){
		return this.http.get(
			this.ENDPOINT_PRODUTO_ESTABELECIMENTO + "/" + estabelecimento.id,
			this.commonsProvider.getCommonHeaders()
		);
	}

	salvarProduto(produto: Produto){
		return this.http.post(
			this.ENDPOINT_PRODUTO,
			produto,
			this.commonsProvider.getPayloadHeaders()
		);
	}
}
