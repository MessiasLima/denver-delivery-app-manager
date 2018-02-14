import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	dadosLogin: any = {};

	constructor(private usuarioService : UsuarioProvider){}

	login(dadosLogin: any){
		this.usuarioService.login(dadosLogin).subscribe((data)=>{
			console.log(data);
		});
	}

}
