import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
import { FormaPagamento } from '../../model/forma-pagamento';

@Injectable()
export class FormaPagamentoProvider {

	private ENDPOINT_FORMA_PAGAMENTO: string;

	constructor(private http: HttpClient, private commonsProvider: CommonsProvider) {
		this.ENDPOINT_FORMA_PAGAMENTO = commonsProvider.getHost() + "/forma-pagamento"
	}

	listarFormasDePagamento() {
		return this.http.get(this.ENDPOINT_FORMA_PAGAMENTO, this.commonsProvider.getCommonHeaders());
	}

	salvar(formaPagamento: FormaPagamento) {
		return this.http.post(this.ENDPOINT_FORMA_PAGAMENTO, formaPagamento, this.commonsProvider.getPayloadHeaders());
	}
}
