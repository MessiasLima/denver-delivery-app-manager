import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { CommonsProvider } from '../providers/commons/commons';
import { HttpClientModule } from '@angular/common/http';
import { EstabelecimentosPageModule } from '../pages/estabelecimentos/estabelecimentos.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { UsuariosAdmPageModule } from '../pages/usuarios-adm/usuarios-adm.module';
import { UsuarioNewPageModule } from '../pages/usuario-new/usuario-new.module';
import { CidadeProvider } from '../providers/cidade/cidade';
import { EstabelecimentoProvider } from '../providers/estabelecimento/estabelecimento';
import { EstabelecimentoDetalhePageModule } from '../pages/estabelecimento-detalhe/estabelecimento-detalhe.module';
import { ImagePicker } from "@ionic-native/image-picker";
import { Base64 } from "@ionic-native/base64";
import { FileTransfer } from "@ionic-native/file-transfer";
import { CardapioPageModule } from "../pages/cardapio/cardapio.module";
import { TiposProdutoPageModule } from "../pages/tipos-produto/tipos-produto.module";
import { NovoProdutoPageModule } from "../pages/novo-produto/novo-produto.module";
import { ProdutoProvider } from '../providers/produto/produto';
import { DownloadProvider } from '../providers/download/download';
import { UtilProvider } from '../providers/util/util';
import { FormaPagamentoPageModule } from '../pages/forma-pagamento/forma-pagamento.module';
import { FormaPagamentoProvider } from '../providers/forma-pagamento/forma-pagamento';

@NgModule({
	declarations: [
		MyApp,
		HomePage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp, {
			backButtonText: '',
			mode: "ios"
		}),
		HttpClientModule,
		EstabelecimentosPageModule,
		SettingsPageModule,
		EstabelecimentoDetalhePageModule,
		UsuariosAdmPageModule,
		UsuarioNewPageModule,
		CardapioPageModule,
		TiposProdutoPageModule,
		NovoProdutoPageModule,
		FormaPagamentoPageModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		UsuarioProvider,
		CommonsProvider,
		CidadeProvider,
		EstabelecimentoProvider,
		ImagePicker,
		Base64,
		FileTransfer,
		ProdutoProvider,
		DownloadProvider,
		UtilProvider,
    	FormaPagamentoProvider
	]
})
export class AppModule { }
