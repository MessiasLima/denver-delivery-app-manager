import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
import { Usuario } from '../../model/usuario';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

	constructor(public http: HttpClient, public commons: CommonsProvider) { }

	login(dadosLogin: any) {
		let data = this.encodeUrlDadosLogin(dadosLogin);
		return this.http.post(
			this.commons.getHost() + "/usuario/login",
			data,
			this.commons.getCommonHeaders()
		);
	}

	private encodeUrlDadosLogin(dadosLogin: any): string {
		return "login=" + dadosLogin.login + "&senha=" + dadosLogin.senha;
	}

	getUsuario(): Usuario {
		let usuarioString = window.localStorage.getItem(this.commons.getUsuarioStorageKey());
		return JSON.parse(usuarioString);
	}

	storeUsuario(usuario: Usuario) {
		window.localStorage.setItem(this.commons.getUsuarioStorageKey(), JSON.stringify(usuario));
	}

	storeAuthorization(authorization: string) {
		window.localStorage.setItem(this.commons.getAuthorizationStorageKey(), authorization);
	}

	getAuthorization(): string {
		return window.localStorage.getItem(this.commons.getAuthorizationStorageKey());
	}

	deleteAuthorization(){
		window.localStorage.removeItem(this.commons.getAuthorizationStorageKey());
	}
}
