import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
import { Estabelecimento } from '../../model/estabelecimento';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';
import { UsuarioProvider } from '../usuario/usuario';
import { UtilProvider } from '../util/util';

@Injectable()
export class EstabelecimentoProvider {

	private ENDPOINT_ESTABELECIMENTO: string;
	private ENDPOINT_ESTABELECIMENTO_IMAGE: string;

	constructor(
		public http: HttpClient,
		private commons: CommonsProvider,
		private fileTransfer: FileTransfer,
		private usuarioService: UsuarioProvider,
		private utilProvider: UtilProvider
	) { 
		this.ENDPOINT_ESTABELECIMENTO = this.commons.getHost() + "/estabelecimento";
		this.ENDPOINT_ESTABELECIMENTO_IMAGE = this.ENDPOINT_ESTABELECIMENTO + "/image";
	}

	listEstabelecimentos() {
		return this.http.get(
			this.ENDPOINT_ESTABELECIMENTO,
			this.commons.getCommonHeaders()
		);
	}

	saveEstabelecimento(estabelecimento: Estabelecimento) {
		return this.http.post(
			this.ENDPOINT_ESTABELECIMENTO,
			estabelecimento,
			this.commons.getPayloadHeaders()
		);
	}

	dataToEstabelecimentoArray(data: any): Estabelecimento[] {
		let estabelecimentos: Estabelecimento[] = [];
		data.forEach(element => {
			estabelecimentos.push({
				id: element.id,
				nome: element.nome,
				descricao: element.descricao,
				status: element.status,
				latitude: element.latitude,
				longitude: element.longitude,
				idCidade: element.idCidade,
				urlImage: element.urlImage,
				cidade: element.cidade
			});
		});
		return estabelecimentos;
	}

	dataToEstabelecimento(data: any): Estabelecimento {

		let estabelecimento: Estabelecimento = {
			id: data.id,
			nome: data.nome,
			descricao: data.descricao,
			status: data.status,
			latitude: data.latitude,
			longitude: data.longitude,
			idCidade: data.idCidade,
			urlImage: data.urlImage,
			cidade: data.cidade
		};

		return estabelecimento;
	}

	saveImage(imageURI: string, idEstabelecimento: number) {
		let extension = this.utilProvider.getFileExtensions(imageURI);
		let fileTransfer = this.fileTransfer.create();
		let options : FileUploadOptions ={
			fileKey: "file",
			fileName: "image." + extension,
			headers:{
				"ContentType": "multipart/form-data",
				"Authorization": this.usuarioService.getAuthorization()
			},
			params:{
				"idEstabelecimento": idEstabelecimento
			}
		};
		return fileTransfer.upload(
			imageURI,
			this.ENDPOINT_ESTABELECIMENTO_IMAGE,
			options
		);
	}
}
