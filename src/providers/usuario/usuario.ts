import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
import { Usuario } from '../../model/usuario';

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

	dataToUsuarioArray(data: any): Usuario[] {
		let usuarios: Usuario[] = [];
		data.forEach(element => {
			usuarios.push({
				email: element.email,
				id: element.id,
				login: element.login,
				nome: element.nome,
				tipo: element.tipo,
				token: element.token
			});
		});
		return usuarios;
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

	deleteAuthorization() {
		window.localStorage.removeItem(this.commons.getAuthorizationStorageKey());
	}

	listAdms() {
		return this.http.get(
			this.commons.getHost() + "/usuario/adm-sistema",
			this.commons.getCommonHeaders()
		);
	}
}
