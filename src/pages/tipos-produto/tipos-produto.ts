import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoProvider } from '../../providers/produto/produto';
import { Estabelecimento } from '../../model/estabelecimento';
import { TipoProduto } from '../../model/tipo-produto';

@IonicPage()
@Component({
	selector: 'page-tipos-produto',
	templateUrl: 'tipos-produto.html',
})
export class TiposProdutoPage {

	carregando: boolean = false;
	erro: boolean = false;
	estabelecimento: Estabelecimento;
	tiposProdutos: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public produtoProvider: ProdutoProvider
	) {
		this.estabelecimento = navParams.get("estabelecimento");
	}

	ionViewDidLoad(){
		this.listarTipoProdutos();
	}

	listarTipoProdutos() {
		this.carregando = true;
		this.erro = false;
		this.produtoProvider.obterTipoProdutosPorEstabelecimento(this.estabelecimento).subscribe(
			data => {
				this.tiposProdutos = data;
				this.carregando = false;
				console.log(data);
			}, (err) => {
				console.log(err);
				this.carregando = false;
				this.erro = true;
			}
		);
	}
}
