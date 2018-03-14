import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
import { Cidade } from '../../model/cidade';
@Injectable()
export class CidadeProvider {

	private ENDPOINT_CIDADE: string;

	constructor(public http: HttpClient, public commons: CommonsProvider) {
		this.ENDPOINT_CIDADE = this.commons.getHost() + "/cidade";
	}

	listCidades() {
		return this.http.get(this.ENDPOINT_CIDADE, this.commons.getCommonHeaders());
	}

	saveCidade(cidade: Cidade) {
		return this.http.post(
			this.ENDPOINT_CIDADE,
			"nome=" + cidade.nome,
			this.commons.getCommonHeaders()
		);
	}

	updateCidade(cidade: Cidade) {
		return this.http.put(
			this.ENDPOINT_CIDADE,
			cidade,
			this.commons.getPayloadHeaders()
		);
	}

	deleteCidade(cidade: Cidade) {
		let options: any = {
			params: {
				id: cidade.id
			}
		};

		options.headers = this.commons.getCommonHeaders().headers;

		return this.http.delete(
			this.ENDPOINT_CIDADE,
			options
		);
	}

	dataToCidadeArray(data: any): Cidade[] {
		let cidades: Cidade[] = [];
		data.forEach(element => {
			cidades.push({
				id: element.id,
				nome: element.nome
			});
		});
		return cidades;
	}
}
