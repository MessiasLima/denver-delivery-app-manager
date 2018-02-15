import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CidadeProvider } from '../../providers/cidade/cidade';
import { Cidade } from '../../model/cidade';
@IonicPage()
@Component({
	selector: 'page-cidades',
	templateUrl: 'cidades.html',
})
export class CidadesPage {

	loading: boolean = false;
	error: boolean = false;
	cidades: Cidade[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private cidadeService: CidadeProvider,
		private alertController: AlertController
	) {
	}

	ionViewDidLoad() {
		this.listCidades();
	}

	listCidades() {
		this.showLoading();
		this.hideError();
		this.cidadeService.listCidades().subscribe((data) => {
			this.cidades = this.dataToCidadeArray(data);
			this.hideLoading();
		}, (err) => {
			console.log(err);
			this.showError();
			this.hideLoading();
		});
	}

	private dataToCidadeArray(data: any) {
		let cidades: Cidade[] = [];
		data.forEach(element => {
			cidades.push({
				id: element.id,
				nome: element.nome
			});
		});
		return cidades;
	}

	private showLoading() {
		this.loading = true;
	}

	private hideLoading() {
		this.loading = false;
	}

	private showError() {
		this.error = true;
	}
	private hideError() {
		this.error = false;
	}

	newCidade() {
		let prompt = this.alertController.create({
			title: "Nova cidade",
			message: "Digite o nome da cidade",
			inputs: [
				{
					name: "nome",
					placeholder: "Nome da cidade"
				},
			],
			buttons: [
				{text: "Cancelar"},
				{
					text: "Salvar",
					handler: data => {
						console.log(data);
					}
				}
			]
		});
		prompt.present();
	}
}
