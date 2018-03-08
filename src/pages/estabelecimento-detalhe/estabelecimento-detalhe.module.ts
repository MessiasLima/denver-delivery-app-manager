import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstabelecimentoDetalhePage } from './estabelecimento-detalhe';
import { EstabelecimentoDetalheInfoComponent } from './estabelecimento-detalhe-info/estabelecimento-detalhe-info';

@NgModule({
	declarations: [
		EstabelecimentoDetalhePage,
		EstabelecimentoDetalheInfoComponent
	],
	imports: [
		IonicPageModule.forChild(EstabelecimentoDetalhePage),
	],
	entryComponents:[
		EstabelecimentoDetalheInfoComponent
	]
})
export class EstabelecimentoDetalhePageModule { }
