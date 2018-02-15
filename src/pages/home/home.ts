import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuario } from '../../model/usuario';
import { EstabelecimentosPage } from '../estabelecimentos/estabelecimentos';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	dadosLogin: any = {};
	loader: any;

	constructor(
		private usuarioService: UsuarioProvider,
		private loadingControlelr: LoadingController,
		private alertController: AlertController,
		private navController : NavController
	) {}

	ionViewDidLoad(){
		this.verifyLogin();
	}

	private verifyLogin(){
		if(this.usuarioService.getAuthorization()){
			this.goToEstabelecimentos();
		}
	}

	private goToEstabelecimentos(){
		this.navController.setRoot(EstabelecimentosPage);
	}

	login(dadosLogin: any) {
		this.showLoading();
		this.usuarioService.login(dadosLogin).subscribe((data) => {
			let usuario = this.dataToUsuario(data);
			this.usuarioService.storeUsuario(usuario);
			this.usuarioService.storeAuthorization(usuario.token);
			this.goToEstabelecimentos();
			this.hideLoading();
		}, (err) => {
			console.log(err);
			this.hideLoading();
			this.showAlert();
		});
	}

	private dataToUsuario(data: any): Usuario {
		let usuario: Usuario = new Usuario;
		usuario.email = data.email;
		usuario.id = data.id;
		usuario.login = data.login;
		usuario.nome = data.nome;
		usuario.tipo = data.tipo;
		usuario.token = data.token;
		return usuario;
	}

	private showAlert() {
		let alert = this.alertController.create({
			title: "Alerta",
			subTitle: "Ocorreu um erro ao realizar login. Verifique os dados informados",
			buttons: ['OK']
		});
		alert.present();
	}

	private showLoading() {
		this.loader = this.loadingControlelr.create({
			content: "Entrando"
		});
		this.loader.present();
	}

	private hideLoading() {
		this.loader.dismiss();
	}
}
