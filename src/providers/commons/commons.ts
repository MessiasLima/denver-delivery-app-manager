import { Injectable } from '@angular/core';
@Injectable()
export class CommonsProvider {
	
	getHost(): string {
		return "http://192.168.1.5:8080"
	}

	getAuthorizationStorageKey() {
		return "br.com.westdelivery.Authorization";
	}

	getUsuarioStorageKey() {
		return "br.com.westdelivery.Usuario";
	}

	getPayloadHeaders(){
		let headers: any = {
			headers: {
				"Content-Type": "application/json"
			}
		}

		let authorization = window.localStorage.getItem(this.getAuthorizationStorageKey());

		if (authorization){
			headers.headers.Authorization = window.localStorage.getItem(this.getAuthorizationStorageKey());
		}
		return headers;
	}

	getMultipartHeaders(){
		let headers: any = {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}

		let authorization = window.localStorage.getItem(this.getAuthorizationStorageKey());

		if (authorization){
			headers.headers.Authorization = window.localStorage.getItem(this.getAuthorizationStorageKey());
		}
		return headers;
	}

	getCommonHeaders() {

		let headers: any = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}

		let authorization = window.localStorage.getItem(this.getAuthorizationStorageKey());

		if (authorization){
			headers.headers.Authorization = window.localStorage.getItem(this.getAuthorizationStorageKey());
		}
		return headers;
	}
}
