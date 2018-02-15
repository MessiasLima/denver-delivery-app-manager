import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadesPage } from '../cidades/cidades';

@IonicPage()
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	goToCidades(){
		this.navCtrl.push(CidadesPage);
	}

}
