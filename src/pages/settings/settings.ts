import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadesPage } from '../cidades/cidades';
import { UsuariosAdmPage } from '../usuarios-adm/usuarios-adm';

@IonicPage()
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	options: any = [
		{ icon: "home", name: "Cidades", page: CidadesPage },
		{ icon: "people", name: "Usuários", page: UsuariosAdmPage }
	];

	goTo(page: any) {
		this.navCtrl.push(page);
	}

}
