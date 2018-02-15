import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import { EstabelecimentosMenu } from './estabelecimentos.menu';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { UsuarioProvider } from '../../providers/usuario/usuario';
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
		public events: Events,
		public usuarioService: UsuarioProvider
	) {
	}

	ionViewDidLoad(){
		this.events.subscribe("logout", ()=>{
			this.logout();
		});

		this.events.subscribe("openSettings", ()=>{
			this.openSettings();
		});
	}

	ionViewWillUnload(){
		this.events.unsubscribe("logout");
		this.events.unsubscribe("openSettings");
	}

	private openSettings(){
		this.navCtrl.push(SettingsPage);
	}

	private logout(){
		this.usuarioService.deleteAuthorization();
		this.navCtrl.setRoot(HomePage);
	}

	showMenu(event) {
		let popover = this.popoverController.create(EstabelecimentosMenu);
		popover.present({
			ev: event
		});
	}
}
