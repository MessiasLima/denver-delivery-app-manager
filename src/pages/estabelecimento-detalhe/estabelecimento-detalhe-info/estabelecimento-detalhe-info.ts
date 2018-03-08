import { Component } from "@angular/core";
import { NavParams, Events } from "ionic-angular";
import { Estabelecimento } from "../../../model/estabelecimento";
import { EstabelecimentoProvider } from "../../../providers/estabelecimento/estabelecimento";

@Component({
    selector: 'estabelecimento-detalhe-info',
    templateUrl: 'estabelecimento-detalhe-info.html'
})
export class EstabelecimentoDetalheInfoComponent {
    estabelecimento: Estabelecimento;
    constructor(
        params: NavParams,
        private events: Events,
        private estabelecimentoService: EstabelecimentoProvider
    ) {
        this.estabelecimento = params.get("estabelecimento");
    }

    getUrlImage(fileName: string) {
        return this.estabelecimentoService.getUrlImage(fileName);
    }

    edit(){
        this.events.publish("edit");
    }
}