import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';

@Injectable()
export class DownloadProvider {

	constructor(
		public http: HttpClient, 
		public commons: CommonsProvider
	) {
	}

	getUrlImage(fileName: string): string {
		return this.commons.getHost() + "/download/" + (fileName || 'default.jpg');
	}
}
