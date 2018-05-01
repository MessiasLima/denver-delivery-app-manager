import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormaPagamentoProvider } from '../../providers/forma-pagamento/forma-pagamento';
import { FormaPagamento } from '../../model/forma-pagamento';

@IonicPage()
@Component({
	selector: 'page-forma-pagamento',
	templateUrl: 'forma-pagamento.html',
})
export class FormaPagamentoPage {

	carregando: boolean = false
	erro: boolean = false;
	formasPagamento: FormaPagamento[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public formaPagamentoProvider: FormaPagamentoProvider,
		private alertController: AlertController,
		private toastController : ToastController
	) { }

	ionViewDidLoad() {
		this.listarFormasPagamento();
	}

	promptFormaPagamento(formaPagamento?:FormaPagamento) {
		let prompt = this.alertController.create({
			title: "Forma de pagamento",
			inputs: [
				{
					name: "nome",
					placeholder: "Nome da forma de pagamento",
					value: formaPagamento ? formaPagamento.nome : ""
				},
			],
			buttons: [
				{ text: "Cancelar" },
				{
					text: "Salvar",
					handler: data => {
						if(formaPagamento != undefined){
							data.id = formaPagamento.id;
						}
						this.salvarFormaDePagamento(data);
					}
				}
			]
		});
		prompt.present();
	}

	private salvarFormaDePagamento(data:FormaPagamento){
		this.formaPagamentoProvider.salvar(data).subscribe(
			(data)=>{
				this.mostrarMensagem("Salvo com sucesso");
				this.listarFormasPagamento();
			},
			(err)=>{
				this.mostrarMensagem("Ocorreu um erro ao salvar a forma de pagamento");
			}
		);
	}

	listarFormasPagamento() {
		this.erro = false;
		this.carregando = true;
		this.formaPagamentoProvider.listarFormasDePagamento().subscribe(
			(data: any) => {
				this.carregando = false;
				this.formasPagamento = data;
			}, (err) => {
				this.erro = true;
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
