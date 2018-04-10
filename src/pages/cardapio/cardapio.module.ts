import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardapioPage } from './cardapio';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [
		CardapioPage,
	],
	imports: [
		IonicPageModule.forChild(CardapioPage),
		ComponentsModule
	],
})
export class CardapioPageModule { }
