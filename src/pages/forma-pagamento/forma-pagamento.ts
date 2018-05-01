import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
		public formaPagamentoProvider: FormaPagamentoProvider
	) { }

	ionViewDidLoad() {
		this.listarFormasPagamento();
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
}
