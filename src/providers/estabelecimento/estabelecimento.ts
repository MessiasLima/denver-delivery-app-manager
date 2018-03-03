import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
import { Estabelecimento } from '../../model/estabelecimento';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';
import { UsuarioProvider } from '../usuario/usuario';

@Injectable()
export class EstabelecimentoProvider {

	private ESTABELECIMENTO = "/estabelecimento"

	constructor(
		public http: HttpClient,
		private commons: CommonsProvider,
		private fileTransfer: FileTransfer,
		private usuarioService: UsuarioProvider
	) { }

	listEstabelecimentos() {
		return this.http.get(
			this.commons.getHost() + this.ESTABELECIMENTO,
			this.commons.getCommonHeaders()
		);
	}

	saveEstabelecimento(estabelecimento: Estabelecimento) {
		return this.http.post(
			this.commons.getHost() + this.ESTABELECIMENTO,
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
		let fileTransfer = this.fileTransfer.create();
		let options : FileUploadOptions ={
			fileKey: "file",
			fileName: "image.png",
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
			this.commons.getHost() + this.ESTABELECIMENTO + "/image",
			options
		);
	}
}
