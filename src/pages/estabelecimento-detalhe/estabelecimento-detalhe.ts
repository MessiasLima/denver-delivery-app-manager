import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Events } from 'ionic-angular';
import { Estabelecimento } from '../../model/estabelecimento';
import { EstabelecimentoProvider } from '../../providers/estabelecimento/estabelecimento';
import { EstabelecimentoDetalheInfoComponent } from './estabelecimento-detalhe-info/estabelecimento-detalhe-info';
import { EstabelecimentoNewComponent } from '../estabelecimentos/estabelecimento-new/estabelecimento-new';

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
		private alertController: AlertController,
		private estabelecimentoService: EstabelecimentoProvider,
		public modalControler: ModalController,
		private events: Events
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
		return this.estabelecimentoService.getUrlImage(fileName);
	}

	openInfo() {
		let modal = this.modalControler.create(EstabelecimentoDetalheInfoComponent, {
			estabelecimento: this.estabelecimento
		});
		modal.present();
	}
}
