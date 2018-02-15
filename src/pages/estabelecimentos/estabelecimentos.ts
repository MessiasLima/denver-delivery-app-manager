import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { EstabelecimentosMenu } from './estabelecimentos.menu';
@IonicPage()
@Component({
	selector: 'page-estabelecimentos',
	templateUrl: 'estabelecimentos.html',
})
export class EstabelecimentosPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public popoverController: PopoverController
	) { }

	showMenu(event) {
		let popover = this.popoverController.create(EstabelecimentosMenu);
		popover.present({
			ev: event
		});
	}
}
