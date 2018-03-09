import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuario } from '../../model/usuario';

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
		public usuarioService: UsuarioProvider
	) { }

	ionViewDidLoad() {
		this.listAdm();
	}

	private listAdm() {
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
}
