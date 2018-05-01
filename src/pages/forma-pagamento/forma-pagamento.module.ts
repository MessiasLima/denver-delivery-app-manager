import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormaPagamentoPage } from './forma-pagamento';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [
		FormaPagamentoPage,
	],
	imports: [
		IonicPageModule.forChild(FormaPagamentoPage),
		ComponentsModule
	],
})
export class FormaPagamentoPageModule { }
