import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Label, LoadingController, Loading, Events } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../../model/usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EventType } from '../../model/events';
import { Estabelecimento } from '../../model/estabelecimento';

@IonicPage()
@Component({
	selector: 'page-usuario-new',
	templateUrl: 'usuario-new.html',
})
export class UsuarioNewPage {

	isEditing: boolean = false;
	title: string = "Novo usuário";
	form: FormGroup;
	usuario: Usuario = new Usuario();
	usuarioOriginal: Usuario;
	senha2: string;
	differentPasswords: boolean = false;
	tipos: any;
	idEstabelecimento: number;
	loader: Loading;
	estabelecimento: Estabelecimento;
	isFromEstabelecimento: boolean;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public usuarioService: UsuarioProvider,
		public toastController: ToastController,
		public loadingController: LoadingController,
		public events: Events
	) {
		this.retrieveNavData();
		this.configureTitle();
		this.buildFormValidator();
		this.configureTipo();
	}

	private configureTitle(){
		this.title = this.isEditing ? "Editar usuário" : "Novo usuário"
	}

	private retrieveNavData(){
		let usuario = this.navParams.get("usuario");
		if(usuario !== undefined){
			this.usuarioOriginal = Object.assign({}, usuario);
			this.usuario = usuario;
			this.isEditing = true;
		}

		let estabelecimento = this.navParams.get("estabelecimento");
		if(estabelecimento !== undefined){
			this.isFromEstabelecimento = true;
			this.estabelecimento = estabelecimento;
		}
	}

	private configureTipo() {
		let usuario = this.usuarioService.getUsuario();
		if (this.idEstabelecimento) {

		} else {
			this.tipos = [
				{ name: "Administrador de sistema", value: Usuario.TIPO_ADM_SISTEMA }
			];
		}
	}

	private buildFormValidator() {
		this.form = new FormGroup({
			nome: new FormControl(this.usuario.nome, [Validators.required, Validators.pattern("[A-Za-z\\ ]{1,500}")]),
			login: new FormControl(this.usuario.login, [Validators.required, Validators.pattern("[a-z0-9]{1,50}")]),
			senha: new FormControl(this.usuario.senha, [Validators.required, Validators.pattern("[A-Za-z0-9]{1,50}")]),
			email: new FormControl(this.usuario.email, [Validators.email]),
			tipo: new FormControl(this.usuario.tipo, Validators.required)
		});
	}

	passwordChange(event) {
		let value = event.srcElement.value;
		this.differentPasswords = !this.passwordAreEquals(this.usuario.senha, value);
	}

	private passwordAreEquals(password: string, retype: string): boolean {
		if(this.isEditing){
			return true;
		}else{
			return password === retype;
		}
	}

	save(usuario: Usuario) {
		if (this.form.valid) {
			if (this.passwordAreEquals(usuario.senha, this.senha2)) {
				this.showLoading();
				this.saveUsuario(usuario);
			} else {
				this.differentPasswords = true;
				this.showToast("As senhas informadas não coincidem");
			}
		} else {
			this.showToast("Ferifique os campos informados");
		}
	}

	private saveUsuario(usuario: Usuario) {
		this.usuarioService.save(usuario).subscribe((data) => {
			this.saveSuccessCallback(data);
		}, (err) => {
			this.saveFailureCallback(err);
		})
	}

	private saveSuccessCallback(data: Object) {
		this.hideLoading();
		this.navCtrl.pop();
		this.events.publish(EventType.EVENT_RELOAD_USERS);
	}

	private saveFailureCallback(err: any) {
		this.hideLoading();
		this.showToast("Ocorreu um erro ao salvar usuário");
		this.usuario = Object.assign({}, this.usuarioOriginal);
	}

	private showToast(message: string) {
		this.toastController.create({
			message: message,
			duration: 3000
		}).present();
	}

	private showLoading() {
		this.loader = this.loadingController.create({
			content: "Salvando dados"
		});
		this.loader.present();
	}

	private hideLoading(): void {
		this.loader.dismiss();
	}
}
