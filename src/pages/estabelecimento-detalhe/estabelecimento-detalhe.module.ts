import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstabelecimentoDetalhePage } from './estabelecimento-detalhe';

@NgModule({
	declarations: [
		EstabelecimentoDetalhePage
	],
	imports: [
		IonicPageModule.forChild(EstabelecimentoDetalhePage),
	]
})
export class EstabelecimentoDetalhePageModule { }
