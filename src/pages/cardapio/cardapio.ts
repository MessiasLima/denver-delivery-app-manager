import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TiposProdutoPage } from '../tipos-produto/tipos-produto';
import { Estabelecimento } from '../../model/estabelecimento';

@IonicPage()
@Component({
	selector: 'page-cardapio',
	templateUrl: 'cardapio.html',
})
export class CardapioPage {

	estabelecimento: Estabelecimento;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.estabelecimento = navParams.get("estabelecimento");
	}

	irParaTipoProdutos() {
		this.navCtrl.push(TiposProdutoPage, { estabelecimento: this.estabelecimento });
	}
}
