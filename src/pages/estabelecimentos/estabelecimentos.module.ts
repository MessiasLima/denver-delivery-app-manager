import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstabelecimentosPage } from './estabelecimentos';
import { EstabelecimentosMenu } from './estabelecimentos.menu'

@NgModule({
	declarations: [
		EstabelecimentosPage,
		EstabelecimentosMenu
	],
	imports: [
		IonicPageModule.forChild(EstabelecimentosPage),
	],
	entryComponents:[
		EstabelecimentosMenu
	]
})
export class EstabelecimentosPageModule { }
