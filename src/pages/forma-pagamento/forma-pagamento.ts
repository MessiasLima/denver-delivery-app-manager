import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-forma-pagamento',
	templateUrl: 'forma-pagamento.html',
})
export class FormaPagamentoPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad FormaPagamentoPage');
	}

}
