import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
import { Usuario } from '../../model/usuario';

@Injectable()
export class UsuarioProvider {

	private ENDPOINT_USUARIO: string;
	private ENDPOINT_USUARIO_ESTABELECIMENTO: string;
	private ENDPOINT_USUARIO_LOGIN: string;
	private ENDPOINT_USUARIO_ADM_SISTEMAS: string;

	constructor(public http: HttpClient, public commons: CommonsProvider) {
		this.ENDPOINT_USUARIO = this.commons.getHost() + "/usuario/";
		this.ENDPOINT_USUARIO_LOGIN = this.commons.getHost() + "/usuario/login";
		this.ENDPOINT_USUARIO_ADM_SISTEMAS = this.commons.getHost() + "/usuario/adm-sistema/";
		this.ENDPOINT_USUARIO_ESTABELECIMENTO = this.commons.getHost() + "/usuario/estabelecimento/";
	}

	login(dadosLogin: any) {
		let data = this.encodeUrlDadosLogin(dadosLogin);
		return this.http.post(
			this.ENDPOINT_USUARIO_LOGIN,
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
				senha: element.senha,
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
			this.ENDPOINT_USUARIO_ADM_SISTEMAS,
			this.commons.getCommonHeaders()
		);
	}

	listByEstabelecimento(idEstabelecimento: number) {
		return this.http.get(
			this.ENDPOINT_USUARIO_ESTABELECIMENTO + idEstabelecimento,
			this.commons.getCommonHeaders()
		);
	}

	save(usuario: Usuario) {
		return this.http.post(
			this.ENDPOINT_USUARIO,
			usuario,
			this.commons.getPayloadHeaders()
		);
	}

	saveUsuarioEstabelecimento(usuario: Usuario, idEstabelecimento: number) {
		return this.http.post(
			this.ENDPOINT_USUARIO_ESTABELECIMENTO + idEstabelecimento,
			usuario,
			this.commons.getPayloadHeaders()
		);
	}

	delete(idUsuario: number) {
		return this.http.delete(
			this.ENDPOINT_USUARIO + idUsuario,
			this.commons.getCommonHeaders()
		);
	}
}
