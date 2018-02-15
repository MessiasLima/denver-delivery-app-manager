import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import { EstabelecimentosMenu } from './estabelecimentos.menu';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
	selector: 'page-estabelecimentos',
	templateUrl: 'estabelecimentos.html',
})
export class EstabelecimentosPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public popoverController: PopoverController,
		public events: Events
	) {
		events.subscribe("logout", ()=>{
			this.logout();
		});
	}

	private logout(){
		this.navCtrl.setRoot(HomePage);
	}

	showMenu(event) {
		let popover = this.popoverController.create(EstabelecimentosMenu);
		popover.present({
			ev: event
		});
	}
}
