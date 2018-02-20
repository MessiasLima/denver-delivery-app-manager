import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstabelecimentosPage } from './estabelecimentos';
import { EstabelecimentosMenu } from './estabelecimentos.menu'
import { ComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [
		EstabelecimentosPage,
		EstabelecimentosMenu
	],
	imports: [
		IonicPageModule.forChild(EstabelecimentosPage),
		ComponentsModule
	],
	entryComponents:[
		EstabelecimentosMenu
	]
})
export class EstabelecimentosPageModule { }
