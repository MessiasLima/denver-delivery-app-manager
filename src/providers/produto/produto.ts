import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsProvider } from '../commons/commons';
import { Estabelecimento } from '../../model/estabelecimento';
import { TipoProduto } from '../../model/tipo-produto';
import { Produto } from '../../model/produto';
import { UtilProvider } from '../util/util';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';
import { UsuarioProvider } from '../usuario/usuario';


@Injectable()
export class ProdutoProvider {

	ENDPOINT_TIPO_PRODUTO: string;
	ENDPOINT_PRODUTO: string;
	ENDPOINT_PRODUTO_ESTABELECIMENTO: string;
	ENDPOINT_TIPO_PRODUTO_ESTABELECIMENTO: string;
	ENDPOINT_PRODUTO_IMAGEM: string;

	constructor(
		public http: HttpClient,
		public commonsProvider: CommonsProvider,
		public utilProvider: UtilProvider,
		public fileTransfer: FileTransfer,
		public usuarioProvider: UsuarioProvider
	) {
		this.ENDPOINT_PRODUTO = commonsProvider.getHost() + "/produto";
		this.ENDPOINT_PRODUTO_IMAGEM = this.ENDPOINT_PRODUTO + "/image";
		this.ENDPOINT_PRODUTO_ESTABELECIMENTO = this.ENDPOINT_PRODUTO + "/estabelecimento";
		this.ENDPOINT_TIPO_PRODUTO = this.ENDPOINT_PRODUTO + "/tipo";
		this.ENDPOINT_TIPO_PRODUTO_ESTABELECIMENTO = this.ENDPOINT_TIPO_PRODUTO + "/estabelecimento";
	}

	obterTipoProdutosPorEstabelecimento(estabelecimento: Estabelecimento) {
		return this.http.get<TipoProduto>(
			this.ENDPOINT_TIPO_PRODUTO_ESTABELECIMENTO + "/" + estabelecimento.id,
			this.commonsProvider.getCommonHeaders()
		);
	}

	salvarTipoProduto(tipoProduto: TipoProduto) {
		return this.http.post(
			this.ENDPOINT_TIPO_PRODUTO,
			tipoProduto,
			this.commonsProvider.getPayloadHeaders()
		);
	}

	obterProdutosPorEstabelecimento(estabelecimento: Estabelecimento){
		return this.http.get(
			this.ENDPOINT_PRODUTO_ESTABELECIMENTO + "/" + estabelecimento.id,
			this.commonsProvider.getCommonHeaders()
		);
	}

	salvarProduto(produto: Produto){
		return this.http.post(
			this.ENDPOINT_PRODUTO,
			produto,
			this.commonsProvider.getPayloadHeaders()
		);
	}

	salvarImagem(imagemURI: string, idProduto: number){
		let extension = this.utilProvider.getFileExtensions(imagemURI);
		let fileTransfer = this.fileTransfer.create();
		let options : FileUploadOptions ={
			fileKey: "file",
			fileName: "image." + extension,
			headers:{
				"ContentType": "multipart/form-data",
				"Authorization": this.usuarioProvider.getAuthorization()
			},
			params:{
				"idProduto": idProduto
			}
		};
		return fileTransfer.upload(
			imagemURI,
			this.ENDPOINT_PRODUTO_IMAGEM,
			options
		);
	}
}
