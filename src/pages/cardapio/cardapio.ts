import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { TiposProdutoPage } from '../tipos-produto/tipos-produto';
import { Estabelecimento } from '../../model/estabelecimento';
import { ProdutoProvider } from '../../providers/produto/produto';
import { Produto } from '../../model/produto';
import { NovoProdutoPage } from '../novo-produto/novo-produto';
import { DownloadProvider } from '../../providers/download/download';
import { EventType } from '../../model/events';

@IonicPage()
@Component({
	selector: 'page-cardapio',
	templateUrl: 'cardapio.html',
})
export class CardapioPage {

	carregando: boolean;
	erro: boolean;
	estabelecimento: Estabelecimento;
	produtos: Produto[] = [];
	produtosOriginal: Produto[] = [];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public produtoProvider: ProdutoProvider,
		public downloadProvider: DownloadProvider,
		public events: Events
	) {
		this.estabelecimento = navParams.get("estabelecimento");
	}

	ionViewDidLoad() {
		this.listarProdutos();
		this.registrarListenersEventos();
	}

	ionViewDidUnload() {
		this.removerListenersEventos();
	}

	private registrarListenersEventos() {
		this.events.subscribe(EventType.EVENT_RECARREGAR_PRODUTOS, () => {
			this.listarProdutos();
		});
	}
	private removerListenersEventos() {
		this.events.unsubscribe(EventType.EVENT_RECARREGAR_PRODUTOS)
	}

	irParaTipoProdutos() {
		this.navCtrl.push(TiposProdutoPage, { estabelecimento: this.estabelecimento });
	}

	listarProdutos() {
		this.carregando = true;
		this.erro = false;
		this.produtoProvider.obterProdutosPorEstabelecimento(this.estabelecimento).subscribe(
			(data: any) => {
				this.carregando = false;
				this.produtos = data;
				this.produtosOriginal = Object.assign([], this.produtos);
			},
			(err) => {
				console.log(err);
				this.erro = true;
				this.carregando = false;
			}
		);
	}

	filtrarItens(event: any) {
		let termoDePesquisa = event.target.value;

		if (termoDePesquisa == undefined) {
			this.produtos = Object.assign([], this.produtosOriginal);
			return;
		}

		this.produtos = this.produtosOriginal.filter(produto => {
			return (produto.nome.toLowerCase().indexOf(termoDePesquisa.toLowerCase()) > -1);
		})
	}

	irParaNovoProduto() {
		this.navCtrl.push(NovoProdutoPage, { estabelecimento: this.estabelecimento });
	}

	getURLImage(url: string) {
		return this.downloadProvider.getUrlImage(url);
	}
}
