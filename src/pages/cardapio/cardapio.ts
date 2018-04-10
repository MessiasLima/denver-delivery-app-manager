import { Component, trigger } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TiposProdutoPage } from '../tipos-produto/tipos-produto';
import { Estabelecimento } from '../../model/estabelecimento';
import { ProdutoProvider } from '../../providers/produto/produto';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { Produto } from '../../model/produto';

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
		public produtoProvider: ProdutoProvider
	) {
		this.estabelecimento = navParams.get("estabelecimento");
	}

	ionViewDidLoad() {
		this.listarProdutos();
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
}
