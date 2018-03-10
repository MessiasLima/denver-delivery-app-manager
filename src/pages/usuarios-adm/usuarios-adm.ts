import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuario } from '../../model/usuario';
import { EventType } from "../../model/events";
import { UsuarioNewPage } from '../usuario-new/usuario-new';

@IonicPage()
@Component({
	selector: 'page-usuarios-adm',
	templateUrl: 'usuarios-adm.html',
})
export class UsuariosAdmPage {

	loading: boolean = false;
	usuarios: Usuario[];
	error: boolean;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public usuarioService: UsuarioProvider,
		public events: Events
	) { }

	ionViewDidLoad() {
		this.listAdm();
		this.subscribeEventListeners();
	}

	ionViewWillUnload() {
		this.unsubscribeEventListeners();
	}

	private subscribeEventListeners() {
		this.events.subscribe(EventType.EVENT_RELOAD_USERS, () => {
			this.listAdm();
		});
	}

	private unsubscribeEventListeners() { 
		this.events.unsubscribe(EventType.EVENT_RELOAD_USERS);
	}

	listAdm() {
		this.loading = true;
		this.error = false;
		this.usuarioService.listAdms().subscribe(
			(data) => {
				this.usuarios = this.usuarioService.dataToUsuarioArray(data);
				this.loading = false;
			},
			(err) => {
				this.loading = false;
				this.error = true;
			}
		);
	}

	openNewUsuario(){
		this.navCtrl.push(UsuarioNewPage);
	}
}
