import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CidadesPage } from './cidades';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [
		CidadesPage,
	],
	imports: [
		IonicPageModule.forChild(CidadesPage),
		ComponentsModule
	],
})
export class CidadesPageModule { }
