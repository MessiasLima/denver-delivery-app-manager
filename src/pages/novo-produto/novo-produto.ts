import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { DownloadProvider } from '../../providers/download/download';
import { Produto } from '../../model/produto';
import { ImagePickerOptions, ImagePicker } from '@ionic-native/image-picker';
import { ProdutoProvider } from '../../providers/produto/produto';
import { Estabelecimento } from '../../model/estabelecimento';
import { TipoProduto } from '../../model/tipo-produto';
import { DecimalPipe } from '@angular/common';
import { EventType } from '../../model/events';

@IonicPage()
@Component({
	selector: 'page-novo-produto',
	templateUrl: 'novo-produto.html',
})
export class NovoProdutoPage {

	carregando: boolean;
	erro: boolean;
	produto: Produto = {};
	imageURI: string;
	estabelecimento: Estabelecimento;
	tiposDeProtudos: TipoProduto[] = [];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public downloadProvider: DownloadProvider,
		public imagePicker: ImagePicker,
		public produtoProvider: ProdutoProvider,
		public decimalPipe: DecimalPipe,
		public toastController: ToastController,
		public events: Events
	) { }

	ionViewDidLoad() {
		this.estabelecimento = this.navParams.get("estabelecimento");
		this.produto.idEstabelecimento = this.estabelecimento.id;
		this.carregarTipoProduto();
	}

	carregarTipoProduto() {
		this.carregando = true;
		this.produtoProvider.obterTipoProdutosPorEstabelecimento(this.estabelecimento).subscribe(
			(data: any) => {
				this.tiposDeProtudos = data;
				this.carregando = false;
			}, (err) => {
				this.carregando = false;
				this.erro = true;
			}
		);
	}

	getImageUrl(url: string) {
		return this.downloadProvider.getUrlImage(url);
	}

	selecionarImagem() {
		let imagePickerOptions: ImagePickerOptions = {
			maximumImagesCount: 1,
			outputType: 0,
			height: 300
		};
		this.imagePicker.getPictures(imagePickerOptions).then((results) => {
			this.imageURI = results[0];
		});
	}

	salvarProduto(produto: Produto) {
		if (!this.produtoEhValido(produto)) {
			this.mostrarMensagem("Verifique os campos informados");
			return;
		}
		this.carregando = true;
		this.produtoProvider.salvarProduto(produto).subscribe(
			(data:any) => {
				this.salvarImagem(data);
				this.events.publish(EventType.EVENT_RECARREGAR_PRODUTOS);
			},
			(err) => {
				this.mostrarMensagem("Falha ao salvar produto");
				this.carregando = false;
			}
		);
	}

	private salvarImagem(produto: Produto){
		if(this.imageURI){
			this.produtoProvider.salvarImagem(this.imageURI, produto.id).then(
				(data)=>{
					this.carregando = false;
					this.mostrarMensagem("Produto salvo");
					this.events.publish(EventType.EVENT_RECARREGAR_PRODUTOS);
					this.navCtrl.pop();
				},
				(err)=>{
					this.carregando = false;
					this.mostrarMensagem("Produto salvo, mas com erros. Por favor, verifique o produto cadastrado");
					this.events.publish(EventType.EVENT_RECARREGAR_PRODUTOS);
					this.navCtrl.pop();
				}
			);
		}else{
			this.carregando = false;
			this.mostrarMensagem("Produto salvo");
			this.events.publish(EventType.EVENT_RECARREGAR_PRODUTOS);
			this.navCtrl.pop();
		}
	}

	private produtoEhValido(produto: Produto): boolean {
		return produto.nome != undefined && produto.valor != undefined && produto.idTipoProduto != undefined;
	}

	converterMoeda(event: any) {
		let valor = event.value;
		let valorFormatado = this.decimalPipe.transform(valor, "1.2-2");
		event.value = valorFormatado;
	}

	private mostrarMensagem(mensagem: string) {
		this.toastController.create({
			message: mensagem,
			duration: 3000
		}).present();
	}
}
