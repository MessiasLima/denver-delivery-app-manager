import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Estabelecimento } from '../../model/estabelecimento';
import { EstabelecimentoProvider } from '../../providers/estabelecimento/estabelecimento';

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
		private estabelecimentoService: EstabelecimentoProvider
	) {
		this.estabelecimento = navParams.get("data");
		this.estabelecimentoOriginal = navParams.get("data");
	}

	promptUpdateEstabelecimeto() {
		let prompt = this.alertController.create({
			title: "Alterar estabelecimento",
			subTitle: "Insira as informações básicas do estabelecimento",
			inputs: [
				{
					label: "Nome",
					name: "nome",
					placeholder: "Nome",
					value: this.estabelecimento.nome
				},
				{
					name: "descricao",
					placeholder: "Descrição",
					label: "Descrição",
					value: this.estabelecimento.descricao
				},
			],
			buttons: [
				{ text: "Cancelar" },
				{
					text: "Salvar",
					handler: data => {
						this.estabelecimentoOriginal.nome = data.nome;
						this.estabelecimentoOriginal.descricao = data.descricao;
						this.saveEstabelecimento(this.estabelecimentoOriginal);
					}
				}
			]
		});
		prompt.present();
	}

	private saveEstabelecimento(estabelecimento: Estabelecimento) {
		this.estabelecimentoService.saveEstabelecimeto(estabelecimento).subscribe(
			(data)=>{
				console.log(data);
			},
			(err)=>{
				console.log(err);
			}
		);
	}
}
