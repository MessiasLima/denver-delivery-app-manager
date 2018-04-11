import { Component } from "@angular/core";
import { NavParams, Events, ViewController } from "ionic-angular";
import { Estabelecimento } from "../../../model/estabelecimento";
import { EstabelecimentoProvider } from "../../../providers/estabelecimento/estabelecimento";
import { DownloadProvider } from "../../../providers/download/download";

@Component({
    selector: 'estabelecimento-detalhe-info',
    templateUrl: 'estabelecimento-detalhe-info.html'
})
export class EstabelecimentoDetalheInfoComponent {
    estabelecimento: Estabelecimento;
    constructor(
        private viewController: ViewController,
        params: NavParams,
        private events: Events,
        private estabelecimentoService: EstabelecimentoProvider,
        private downloadProvider: DownloadProvider
    ) {
        this.estabelecimento = params.get("estabelecimento");
    }

    getUrlImage(fileName: string) {
        return this.downloadProvider.getUrlImage(fileName);
    }

    edit(){
        this.events.publish("edit");
        this.viewController.dismiss();
    }
}