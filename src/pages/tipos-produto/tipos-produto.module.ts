import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiposProdutoPage } from './tipos-produto';

@NgModule({
  declarations: [
    TiposProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(TiposProdutoPage),
  ],
})
export class TiposProdutoPageModule {}
