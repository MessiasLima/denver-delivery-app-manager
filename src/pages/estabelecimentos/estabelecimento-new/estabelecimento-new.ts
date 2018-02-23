import { Component } from '@angular/core';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { EstabelecimentoProvider } from '../../../providers/estabelecimento/estabelecimento';
import { Estabelecimento } from '../../../model/estabelecimento';
import { CidadeProvider } from '../../../providers/cidade/cidade';
import { Cidade } from '../../../model/cidade';

@Component({
    selector: 'estabelecimento-new',
    templateUrl: 'estabelecimento-new.html'
})
export class EstabelecimentoNewComponent {

    loading: boolean = false;
    imageURI: string;
    imageBase64: string;
    estabelecimento: Estabelecimento = new Estabelecimento();
    cidades: Cidade[];
    error: boolean = false;
    errorMessage: string = "";
    selectedCidade: Cidade;

    constructor(
        public imagePicker: ImagePicker,
        public base64: Base64,
        public estabelecimentoService: EstabelecimentoProvider,
        public cidadeService: CidadeProvider
    ) { }

    ionViewDidLoad() {
        this.listCidades();
    }

    listCidades() {
        this.loading = true;
        this.cidadeService.listCidades().subscribe((data) => {
            this.cidades = this.cidadeService.dataToCidadeArray(data);
            this.loading = false;
        }, (err) => {
            this.errorMessage = "Não foi possivel carregar as cidades"
            this.error = true;
            this.loading = false;
        })
    }

    pickImage() {
        let imagePickerOptions: ImagePickerOptions = {
            maximumImagesCount: 1,
            outputType: 0,
            height: 300
        };
        this.imagePicker.getPictures(imagePickerOptions).then((results) => {
            this.imageURI = results[0];
            this.uriToBase64(this.imageURI);
        });
    }

    private uriToBase64(uri: string) {
        this.base64.encodeFile(this.imageURI).then((data) => {
            this.imageBase64 = data;
        });
    }

    save(estabelecimento: Estabelecimento) {
        console.log(estabelecimento);
    }
}
