import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
    template: `
      <ion-list>
        <button ion-item (click)="close()">Configurações</button>
        <button ion-item (click)="close()">Sair</button>
      </ion-list>
    `
})
export class EstabelecimentosMenu {
    constructor(public viewCtrl: ViewController) { }

    close() {
        this.viewCtrl.dismiss();
    }
}