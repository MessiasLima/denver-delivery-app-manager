import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
import { FormaPagamento } from '../../model/forma-pagamento';
import { Estabelecimento } from '../../model/estabelecimento';

@Injectable()
export class FormaPagamentoProvider {

	private ENDPOINT_FORMA_PAGAMENTO: string;
	private ENDPOINT_FORMA_PAGAMENTO_ESTABELECIMENTO: string;

	constructor(private http: HttpClient, private commonsProvider: CommonsProvider) {
		this.ENDPOINT_FORMA_PAGAMENTO = commonsProvider.getHost() + "/forma-pagamento";
		this.ENDPOINT_FORMA_PAGAMENTO_ESTABELECIMENTO = this.ENDPOINT_FORMA_PAGAMENTO + "/estabelecimento/";
	}

	listarFormasDePagamento() {
		return this.http.get(this.ENDPOINT_FORMA_PAGAMENTO, this.commonsProvider.getCommonHeaders());
	}

	listarFormasPagamentoSelecionadas(estabelecimento: Estabelecimento) {
		return this.http.get(this.ENDPOINT_FORMA_PAGAMENTO_ESTABELECIMENTO + estabelecimento.id, this.commonsProvider.getCommonHeaders());
	}

	salvar(formaPagamento: FormaPagamento) {
		return this.http.post(this.ENDPOINT_FORMA_PAGAMENTO, formaPagamento, this.commonsProvider.getPayloadHeaders());
	}

	salvarFormaPagamentoPorEstabelecimento(formaPagamentos: FormaPagamento[], estabelecimento:Estabelecimento){
		return this.http.post(
			this.ENDPOINT_FORMA_PAGAMENTO_ESTABELECIMENTO + estabelecimento.id,
			formaPagamentos,
			this.commonsProvider.getPayloadHeaders()
		);
	}
}
