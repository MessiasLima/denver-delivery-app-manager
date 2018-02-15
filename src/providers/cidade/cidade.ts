import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
@Injectable()
export class CidadeProvider {

	constructor(public http: HttpClient, public commons: CommonsProvider) { }

	listCidades(){
		return this.http.get(this.commons.getHost() + "/cidade", this.commons.getCommonHeaders());
	}
}
