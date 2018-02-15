import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
		private alertController: AlertController,
		private toastController: ToastController
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
				{ text: "Cancelar" },
				{
					text: "Salvar",
					handler: data => {
						this.saveCidade(data);
					}
				}
			]
		});
		prompt.present();
	}

	private saveCidade(cidade: Cidade) {
		this.showLoading();
		this.cidadeService.saveCidade(cidade).subscribe((data) => {
			this.hideLoading();
			this.listCidades();
		}, (err) => {
			this.hideLoading();
			this.toastController.create({
				message: "Ocorreu um erro ao salvar a cidade",
				duration: 3000
			}).present();
		});
	}

	promptDeleteCidade(cidade: Cidade) {
		let prompt = this.alertController.create({
			title: "Deletar cidade",
			message: "Tem certeza que deseja deletar " + cidade.nome + "?",
			buttons: [
				{ text: "Cancelar" },
				{
					text: "Deletar",
					handler: data => {
						this.deleteCidade(cidade);
					}
				}
			]
		});
		prompt.present();
	}

	private deleteCidade(cidade: Cidade) {
		this.showLoading();
		this.cidadeService.deleteCidade(cidade).subscribe((data) => {
			this.hideLoading();
			this.listCidades();
		}, (err) => {
			this.hideLoading();
			if (err.status == 200) {
				this.listCidades();
			} else {
				this.toastController.create({
					message: "Ocorreu um erro ao deletar a cidade",
					duration: 3000
				}).present();
			}
		});
	}
}
