import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Estabelecimento } from '../../model/estabelecimento';
import { EstabelecimentoDetalheInfoComponent } from './estabelecimento-detalhe-info/estabelecimento-detalhe-info';
import { EstabelecimentoNewComponent } from '../estabelecimentos/estabelecimento-new/estabelecimento-new';
import { UsuariosAdmPage } from '../usuarios-adm/usuarios-adm';
import { CardapioPage } from '../cardapio/cardapio';
import { DownloadProvider } from '../../providers/download/download';

@IonicPage()
@Component({
	selector: 'page-estabelecimento-detalhe',
	templateUrl: 'estabelecimento-detalhe.html',
})
export class EstabelecimentoDetalhePage {

	estabelecimento: Estabelecimento;
	estabelecimentoOriginal: Estabelecimento;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalControler: ModalController,
		private events: Events,
		private downloadProvider: DownloadProvider
	) {
		this.estabelecimento = navParams.get("data");
		this.estabelecimentoOriginal = navParams.get("data");
	}

	ionViewDidLoad() {
		this.events.subscribe("edit", () => { this.openEditEstabelecimento(); });
	}

	ionViewWillUnload() {
		this.events.unsubscribe("edit");
	}

	private openEditEstabelecimento() {
		let modal = this.modalControler.create(EstabelecimentoNewComponent, {
			estabelecimento: this.estabelecimento
		});
		modal.present();
	}

	getURLImage(fileName: string) {
		return this.downloadProvider.getUrlImage(fileName);
	}

	openInfo() {
		let modal = this.modalControler.create(EstabelecimentoDetalheInfoComponent, {
			estabelecimento: this.estabelecimento
		});
		modal.present();
	}

	openUsersManager() {
		this.navCtrl.push(UsuariosAdmPage, { estabelecimento: this.estabelecimento });
	}

	openProducts() {
		this.navCtrl.push(CardapioPage, { estabelecimento: this.estabelecimento });
	}
}
