import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuariosAdmPage } from './usuarios-adm';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [
		UsuariosAdmPage,
	],
	imports: [
		IonicPageModule.forChild(UsuariosAdmPage),
		ComponentsModule
	],
})
export class UsuariosAdmPageModule { }
