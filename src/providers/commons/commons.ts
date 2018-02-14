import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class CommonsProvider {
	getHost(): string {
		return "http://localhost:8080"
	}

	getAuthorizationStorageKey(){
		return "br.com.westdelivery.Authorization";
	}

	getCommonHeaders() {
		return {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": window.localStorage.getItem(this.getAuthorizationStorageKey())
			}
		}
	}
}
