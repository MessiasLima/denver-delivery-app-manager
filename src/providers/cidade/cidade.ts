import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
import { Cidade } from '../../model/cidade';
@Injectable()
export class CidadeProvider {

	constructor(public http: HttpClient, public commons: CommonsProvider) { }

	listCidades() {
		return this.http.get(this.commons.getHost() + "/cidade", this.commons.getCommonHeaders());
	}

	saveCidade(cidade: Cidade) {
		return this.http.post(
			this.commons.getHost() + "/cidade",
			"nome=" + cidade.nome,
			this.commons.getCommonHeaders()
		);
	}

	updateCidade(cidade:Cidade){
		return this.http.put(
			this.commons.getHost() + "/cidade",
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
			this.commons.getHost() + "/cidade",
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
