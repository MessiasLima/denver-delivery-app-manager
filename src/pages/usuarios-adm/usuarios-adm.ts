import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController, AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuario } from '../../model/usuario';
import { EventType } from "../../model/events";
import { UsuarioNewPage } from '../usuario-new/usuario-new';
import { Observable } from 'rxjs/Observable';
import { Estabelecimento } from '../../model/estabelecimento';

@IonicPage()
@Component({
	selector: 'page-usuarios-adm',
	templateUrl: 'usuarios-adm.html',
})
export class UsuariosAdmPage {

	loading: boolean = false;
	usuarios: Usuario[];
	error: boolean;
	isFromEstabelecimento: boolean = false;
	estabelecimento: Estabelecimento;
	title : string = "Administradores";

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public usuarioService: UsuarioProvider,
		public events: Events,
		public toastController: ToastController,
		public alertController: AlertController
	) {
		this.retriveNavData();
	}

	private retriveNavData() {
		let estabelecimento = this.navParams.get("estabelecimento");
		if (estabelecimento !== undefined) {
			this.title = "Usuários";
			this.isFromEstabelecimento = true;
			this.estabelecimento = estabelecimento;
		}
	}

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

		let observable;
		if (this.isFromEstabelecimento) {
			observable = this.usuarioService.listByEstabelecimento(this.estabelecimento.id);
		} else {
			observable = this.usuarioService.listAdms();
		}

		observable.subscribe(
			(data) => {
				if (data !== null) {
					this.usuarios = this.usuarioService.dataToUsuarioArray(data);
				}
				this.loading = false;
			},
			(err) => {
				this.loading = false;
				this.error = true;
			}
		);
	}

	openNewUsuario() {
		this.navCtrl.push(UsuarioNewPage);
	}

	editUsuario(usuario: Usuario) {
		this.navCtrl.push(UsuarioNewPage, { usuario: usuario });
	}

	private showToast(message: string) {
		this.toastController.create({
			message: message,
			duration: 3000
		}).present();
	}

	promptDelete(idUsuario: number) {
		let prompt = this.alertController.create({
			title: "Deletar usuário",
			message: "Tem certeza que deseja deletar esse usuário? Essa operação não poderá ser desfeita",
			buttons: [
				{ text: "Cancelar" },
				{
					text: "Deletar",
					handler: data => {
						this.delete(idUsuario);
					}
				}
			]
		});
		prompt.present();
	}

	private delete(idUsuario: number) {
		this.loading = true;
		this.usuarioService.delete(idUsuario).subscribe(
			() => {
				this.loading = false;
				this.showToast("Usuário deletado");
				this.listAdm();
			}, (err) => {
				this.loading = false;
				if (err.status != 200) {
					this.loading = false;
					this.showToast("Ocorreu um erro ao deletar o Usuário");
				} else {
					this.showToast("Usuário deletado");
					this.listAdm();
				}
			}
		)
	}
}
