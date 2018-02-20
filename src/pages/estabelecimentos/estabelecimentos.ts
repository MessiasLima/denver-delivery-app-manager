import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import { EstabelecimentosMenu } from './estabelecimentos.menu';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EstabelecimentoProvider } from '../../providers/estabelecimento/estabelecimento';
import { Estabelecimento } from '../../model/estabelecimento';
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
		private estabelecimentoService: EstabelecimentoProvider
	) {
	}

	ionViewDidLoad() {

		this.listEstabelecimentos(undefined);

		this.events.subscribe("logout", () => {
			this.logout();
		});

		this.events.subscribe("openSettings", () => {
			this.openSettings();
		});
	}

	ionViewWillUnload() {
		this.events.unsubscribe("logout");
		this.events.unsubscribe("openSettings");
	}

	private openSettings() {
		this.navCtrl.push(SettingsPage);
	}

	private logout() {
		this.usuarioService.deleteAuthorization();
		this.navCtrl.setRoot(HomePage);
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
				this.estabelecimentos = this.dataToEstabelecimentoArray(data);
				this.hideLoading(refresher);
			},
			(err) => {
				this.error = true;
				this.hideLoading(refresher);
			}
		);
	}

	private hideLoading(refresher:any){
		if (refresher != null) {
			refresher.complete();
		}else{
			this.loading = false;
		}
	}

	dataToEstabelecimentoArray(data: any): Estabelecimento[] {
		let estabelecimentos: Estabelecimento[] = [];
		data.forEach(element => {
			estabelecimentos.push({
				id: element.id,
				nome: element.nome,
				descricao: element.descricao,
				status: element.status,
				latitude: element.latitude,
				longitude: element.longitude,
				idCidade: element.idCidade,
				urlImage: element.urlImage,
				cidade: element.cidade
			});
		});
		return estabelecimentos;
	}
}
