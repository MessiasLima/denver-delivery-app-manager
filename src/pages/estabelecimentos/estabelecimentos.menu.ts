import { Component } from "@angular/core";
import { ViewController, Events } from "ionic-angular";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { Usuario } from "../../model/usuario";

@Component({
    template: `
      <ion-list>
            <button ion-item [hidden]="!isUsuarioAdmGeral()" (click)="openSettings()">
                Configurações
            </button>
            <button ion-item (click)="logout()">
                Sair
            </button>
      </ion-list>
    `
})
export class EstabelecimentosMenu {

    usuario: Usuario;

    constructor(
        public viewCtrl: ViewController,
        usuarioService: UsuarioProvider,
        public events: Events
    ) {
        this.usuario = usuarioService.getUsuario();
    }

    openSettings(){
        this.viewCtrl.dismiss();
        this.events.publish("openSettings");
    }

    isUsuarioAdmGeral(): boolean {
        return this.usuario.tipo == Usuario.TIPO_ADM_SISTEMA;
    }

    logout() {
        this.viewCtrl.dismiss();
        this.events.publish("logout");
    }
}