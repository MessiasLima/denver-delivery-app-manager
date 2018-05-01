import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, AlertController, ToastController } from 'ionic-angular';
import { Estabelecimento } from '../../model/estabelecimento';
import { EstabelecimentoDetalheInfoComponent } from './estabelecimento-detalhe-info/estabelecimento-detalhe-info';
import { EstabelecimentoNewComponent } from '../estabelecimentos/estabelecimento-new/estabelecimento-new';
import { UsuariosAdmPage } from '../usuarios-adm/usuarios-adm';
import { CardapioPage } from '../cardapio/cardapio';
import { DownloadProvider } from '../../providers/download/download';
import { FormaPagamentoProvider } from '../../providers/forma-pagamento/forma-pagamento';
import { FormaPagamento } from '../../model/forma-pagamento';

@IonicPage()
@Component({
	selector: 'page-estabelecimento-detalhe',
	templateUrl: 'estabelecimento-detalhe.html',
})
export class EstabelecimentoDetalhePage {

	estabelecimento: Estabelecimento;
	estabelecimentoOriginal: Estabelecimento;
	formasPagamento: FormaPagamento[];
	formasPagamentoSelecionadas: FormaPagamento[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalControler: ModalController,
		private events: Events,
		private downloadProvider: DownloadProvider,
		private formaPagamentoProvider: FormaPagamentoProvider,
		private alertController: AlertController,
		private toastController: ToastController
	) {
		this.estabelecimento = navParams.get("data");
		this.estabelecimentoOriginal = navParams.get("data");
		this.listarFormasPagamento();
		this.listarFormasPagamentoSelecionadas();
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

	private listarFormasPagamento() {
		this.formaPagamentoProvider.listarFormasDePagamento().subscribe(
			(data: any) => {
				this.formasPagamento = data;
			}
		);
	}

	private listarFormasPagamentoSelecionadas() {
		this.formaPagamentoProvider.listarFormasPagamentoSelecionadas(this.estabelecimento).subscribe(
			(data: any) => {
				this.formasPagamentoSelecionadas = data;
			}
		);
	}

	promptFormasPagamento() {
		let alert = this.alertController.create();
		alert.setTitle("Formas de pagamento");
		alert.setMessage("Selecione as formas de pagamento que seu estabelecimento aceita");

		this.formasPagamento.forEach(formaPagamento => {
			alert.addInput({
				type: 'checkbox',
				label: formaPagamento.nome,
				value: JSON.stringify(formaPagamento),
				checked: this.verificarSeFormaPagamentoFoiSelecionada(formaPagamento)
			});
		});

		alert.addButton('Cancel');

		alert.addButton({
			text: 'Okay',
			handler: data => {
				this.salvarFormasDePagamentoSelecionadas(data);
			}
		});

		alert.present();
	}

	verificarSeFormaPagamentoFoiSelecionada(formaPagamento: FormaPagamento): boolean {
		let selecionada = false;
		this.formasPagamentoSelecionadas.forEach(element => {
			if (element.id == formaPagamento.id) {
				selecionada = true;
			}
		});
		return selecionada;
	}

	private salvarFormasDePagamentoSelecionadas(data: string[]) {
		let formaPagamentoParaSalvar: FormaPagamento[] = [];
		data.forEach(element => {
			formaPagamentoParaSalvar.push(JSON.parse(element));
		});
		this.formaPagamentoProvider.salvarFormaPagamentoPorEstabelecimento(formaPagamentoParaSalvar, this.estabelecimento).subscribe(
			()=>{
				this.mostrarMensagem("Formas de pagamento salvas");
				this.listarFormasPagamento();
				this.listarFormasPagamentoSelecionadas();
			},
			(err)=>{
				this.mostrarMensagem("Falha ao salvar formas de pagamento");
			}
		);
	}

	private mostrarMensagem(mensagem: string) {
		this.toastController.create({
			message: mensagem,
			duration: 3000
		}).present();
	}
}
