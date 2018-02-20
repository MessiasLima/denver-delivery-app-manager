import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';

@Injectable()
export class EstabelecimentoProvider {

	constructor(
		public http: HttpClient,
		private commons: CommonsProvider
	) {}

	listEstabelecimentos(){
		return this.http.get(
			this.commons.getHost() + "/estabelecimento",
			this.commons.getCommonHeaders()
		);
	}
}
