import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Estabelecimento } from '../../model/estabelecimento';
import { EstabelecimentoProvider } from '../../providers/estabelecimento/estabelecimento';

@IonicPage()
@Component({
	selector: 'page-estabelecimento-detalhe',
	templateUrl: 'estabelecimento-detalhe.html',
})
export class EstabelecimentoDetalhePage {

	estabelecimento: Estabelecimento;
	estabelecimentoOriginal: Estabelecimento;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private alertController: AlertController,
		private estabelecimentoService: EstabelecimentoProvider
	) {
		this.estabelecimento = navParams.get("data");
		this.estabelecimentoOriginal = navParams.get("data");
	}

	getURLImage(fileName:string){
		return this.estabelecimentoService.getUrlImage(fileName);
	}
}
