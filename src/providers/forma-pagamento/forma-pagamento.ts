import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';

@Injectable()
export class FormaPagamentoProvider {

	private ENDPOINT_FORMA_PAGAMENTO: string;

	constructor(private http: HttpClient, private commonsProvider: CommonsProvider) {
		this.ENDPOINT_FORMA_PAGAMENTO = commonsProvider.getHost() + "/forma-pagamento"
	}

	listarFormasDePagamento(){
		return this.http.get(this.ENDPOINT_FORMA_PAGAMENTO, this.commonsProvider.getCommonHeaders());
	}
}
