import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class CommonsProvider {
	getHost(): string {
		return "http://localhost:8080"
	}

	getAuthorizationStorageKey() {
		return "br.com.westdelivery.Authorization";
	}

	getUsuarioStorageKey() {
		return "br.com.westdelivery.Usuario";
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
