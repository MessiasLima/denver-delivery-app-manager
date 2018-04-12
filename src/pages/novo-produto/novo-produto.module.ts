import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoProdutoPage } from './novo-produto';
import { ComponentsModule } from '../../components/components.module';
import { DecimalPipe } from '@angular/common';

@NgModule({
	declarations: [
		NovoProdutoPage,
	],
	imports: [
		IonicPageModule.forChild(NovoProdutoPage),
		ComponentsModule
	],
	providers: [DecimalPipe]
})
export class NovoProdutoPageModule { }
