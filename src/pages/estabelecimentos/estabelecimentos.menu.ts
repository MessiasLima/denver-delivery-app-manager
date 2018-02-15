import { Component } from "@angular/core";
import { ViewController, NavController, Events } from "ionic-angular";
import { HomePage } from "../home/home";
import { UsuarioProvider } from "../../providers/usuario/usuario";

@Component({
    template: `
      <ion-list>
        <button ion-item (click)="close()">Configurações</button>
        <button ion-item (click)="logout()">Sair</button>
      </ion-list>
    `
})
export class EstabelecimentosMenu {
    constructor(
        public viewCtrl: ViewController,
        private navController : NavController,
        private usuarioService: UsuarioProvider,
        public events: Events
    ) { }

    logout() {
        this.usuarioService.deleteAuthorization();
        this.viewCtrl.dismiss();
        this.events.publish("logout");
    }
}