import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstabelecimentosPage } from './estabelecimentos';
import { EstabelecimentosMenu } from './estabelecimentos.menu'
import { ComponentsModule } from '../../components/components.module';
import { EstabelecimentoNewComponent } from './estabelecimento-new/estabelecimento-new';

@NgModule({
	declarations: [
		EstabelecimentosPage,
		EstabelecimentosMenu,
		EstabelecimentoNewComponent
	],
	imports: [
		IonicPageModule.forChild(EstabelecimentosPage),
		ComponentsModule
	],
	entryComponents:[
		EstabelecimentosMenu,
		EstabelecimentoNewComponent
	]
})
export class EstabelecimentosPageModule { }
