import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
import { Estabelecimento } from '../../model/estabelecimento';

@Injectable()
export class EstabelecimentoProvider {

	private ESTABELECIMENTO = "/estabelecimento"

	constructor(
		public http: HttpClient,
		private commons: CommonsProvider
	) {}

	listEstabelecimentos(){
		return this.http.get(
			this.commons.getHost() + this.ESTABELECIMENTO,
			this.commons.getCommonHeaders()
		);
	}

	saveEstabelecimeto(estabelecimento: Estabelecimento){
		return this.http.post(
			this.commons.getHost() + this.ESTABELECIMENTO,
			estabelecimento,
			this.commons.getPayloadHeaders()
		);
	}
}
