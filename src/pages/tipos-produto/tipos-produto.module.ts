import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiposProdutoPage } from './tipos-produto';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [
		TiposProdutoPage,
	],
	imports: [
		IonicPageModule.forChild(TiposProdutoPage),
		ComponentsModule
	],
})
export class TiposProdutoPageModule { }
