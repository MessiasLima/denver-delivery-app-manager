import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

	constructor(public http: HttpClient, public commons: CommonsProvider) { }

	login(dadosLogin: any) {
		console.log(dadosLogin);

		let data = this.encodeUrlDadosLogin(dadosLogin);
		return this.http.post(
			this.commons.getHost() + "/usuario/login",
			data,
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}
		);
	}

	private encodeUrlDadosLogin(dadosLogin: any): string {
		return "login=" + dadosLogin.login + "&senha=" + dadosLogin.senha;
	}
}
