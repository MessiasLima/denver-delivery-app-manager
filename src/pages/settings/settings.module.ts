import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { CidadesPageModule } from '../cidades/cidades.module';

@NgModule({
	declarations: [
		SettingsPage,
	],
	imports: [
		IonicPageModule.forChild(SettingsPage),
		CidadesPageModule
	],
})
export class SettingsPageModule { }
