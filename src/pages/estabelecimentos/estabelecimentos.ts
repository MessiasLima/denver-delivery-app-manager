import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events, ModalController, AlertController } from 'ionic-angular';
import { EstabelecimentosMenu } from './estabelecimentos.menu';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EstabelecimentoProvider } from '../../providers/estabelecimento/estabelecimento';
import { Estabelecimento } from '../../model/estabelecimento';
import { EstabelecimentoDetalhePage } from '../estabelecimento-detalhe/estabelecimento-detalhe';
import { Usuario } from '../../model/usuario';
import { EstabelecimentoNewComponent } from './estabelecimento-new/estabelecimento-new';
import { CommonsProvider } from '../../providers/commons/commons';
@IonicPage()
@Component({
	selector: 'page-estabelecimentos',
	templateUrl: 'estabelecimentos.html',
})
export class EstabelecimentosPage {

	estabelecimentos: Estabelecimento[];
	loading: boolean = false;
	error: boolean = false;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public popoverController: PopoverController,
		public events: Events,
		public usuarioService: UsuarioProvider,
		private estabelecimentoService: EstabelecimentoProvider,
		public modalController: ModalController,
		public commonService: CommonsProvider,
		private alertController: AlertController
	) {
	}

	isAdm(): boolean {
		let usuario = this.usuarioService.getUsuario();
		return usuario.tipo != Usuario.TIPO_FUNCIONARIO;
	}

	isAdmSistema(): boolean {
		let usuario = this.usuarioService.getUsuario();
		return usuario.tipo == Usuario.TIPO_ADM_SISTEMA;
	}

	ionViewDidLoad() {

		this.listEstabelecimentos(undefined);

		this.events.subscribe("logout", () => {
			this.logout();
		});

		this.events.subscribe("openSettings", () => {
			this.openSettings();
		});

		this.events.subscribe("refresh", () => {
			this.listEstabelecimentos(undefined);
		});
	}

	ionViewWillUnload() {
		this.events.unsubscribe("logout");
		this.events.unsubscribe("openSettings");
		this.events.unsubscribe("refresh");
	}

	private openSettings() {
		this.navCtrl.push(SettingsPage);
	}

	private logout() {
		let prompt = this.alertController.create({
			title: "Sair do aplicativo",
			message: "Tem certeza que deseja sair do aplicativo?",
			buttons: [
				{ text: "Cancelar" },
				{
					text: "Sair",
					handler: () => {
						this.usuarioService.deleteAuthorization();
						this.navCtrl.setRoot(HomePage);
					}
				}
			]
		});
		prompt.present();
	}

	showMenu(event) {
		let popover = this.popoverController.create(EstabelecimentosMenu);
		popover.present({
			ev: event
		});
	}

	listEstabelecimentos(refresher: any) {
		if (refresher === undefined) {
			this.loading = true;
		}
		this.error = false;

		this.estabelecimentoService.listEstabelecimentos().subscribe(
			(data) => {
				this.estabelecimentos = this.estabelecimentoService.dataToEstabelecimentoArray(data);
				this.hideLoading(refresher);
			},
			(err) => {
				this.error = true;
				this.hideLoading(refresher);
			}
		);
	}

	private hideLoading(refresher: any) {
		if (refresher != null) {
			refresher.complete();
		} else {
			this.loading = false;
		}
	}

	getUrlImage(fileName: string): string {
		return this.estabelecimentoService.getUrlImage(fileName);
	}

	goToEstabelecimentoDetalhe(estabelecimento: Estabelecimento) {
		this.navCtrl.push(EstabelecimentoDetalhePage, { data: estabelecimento });
	}

	openNewEstabelecimentoModal() {
		let modal = this.modalController.create(EstabelecimentoNewComponent);
		modal.present();
	}
}
