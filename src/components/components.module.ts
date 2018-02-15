import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading';
import { IonicModule } from 'ionic-angular';
import { ErrorMessageComponent } from './error-message/error-message';
@NgModule({
	declarations: [
		LoadingComponent,
		ErrorMessageComponent
	],
	imports: [IonicModule],
	exports: [
		LoadingComponent,
		ErrorMessageComponent
	]
})
export class ComponentsModule { }
