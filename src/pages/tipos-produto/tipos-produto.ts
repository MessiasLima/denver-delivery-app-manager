import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ProdutoProvider } from '../../providers/produto/produto';
import { Estabelecimento } from '../../model/estabelecimento';
import { TipoProduto } from '../../model/tipo-produto';

@IonicPage()
@Component({
	selector: 'page-tipos-produto',
	templateUrl: 'tipos-produto.html',
})
export class TiposProdutoPage {

	carregando: boolean = false;
	erro: boolean = false;
	estabelecimento: Estabelecimento;
	tiposProdutos: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public produtoProvider: ProdutoProvider,
		public alertController: AlertController,
		public toastController: ToastController
	) {
		this.estabelecimento = navParams.get("estabelecimento");
	}

	alertNovoTipoProduto(tipoProdutoSelecionado?: TipoProduto) {

		let estaEditando: boolean = tipoProdutoSelecionado != undefined;

		let prompt = this.alertController.create({
			title: "Tipo de produto",
			inputs: [
				{
					name: "nome",
					placeholder: "Descrição",
					value: estaEditando ? tipoProdutoSelecionado.nome : undefined
				},
			],
			buttons: [
				{ text: "Cancelar"},
				{
					text: "Salvar",
					handler: data => {
						let tipoProduto: TipoProduto;
						if (estaEditando) {
							tipoProduto = tipoProdutoSelecionado;
							tipoProduto.nome = data.nome;
						}else{
							tipoProduto = {
								nome: data.nome,
								idEstabelecimento: this.estabelecimento.id
							};
						}
						this.salvarTipoProduto(tipoProduto);
					}
				}
			]
		});
		prompt.present();
	}

	ionViewDidLoad() {
		this.listarTipoProdutos();
	}

	listarTipoProdutos() {
		this.carregando = true;
		this.erro = false;
		this.produtoProvider.obterTipoProdutosPorEstabelecimento(this.estabelecimento).subscribe(
			data => {
				this.tiposProdutos = data;
				this.carregando = false;
			}, (err) => {
				console.log(err);
				this.carregando = false;
				this.erro = true;
			}
		);
	}

	private salvarTipoProduto(tipoProduto: TipoProduto) {
		this.produtoProvider.salvarTipoProduto(tipoProduto).subscribe(
			(data) => {
				this.mostrarMensagem("Registro salvo");
				this.listarTipoProdutos();
			}, (err) => {
				this.mostrarMensagem("Falha ao salvar tipo do produto");
			}
		)
	}

	private mostrarMensagem(mensagem: string) {
		this.toastController.create({
			message: mensagem,
			duration: 3000
		}).present();
	}

	promptUpdateTipoProduto(tipoProduto: TipoProduto) {

	}
}
