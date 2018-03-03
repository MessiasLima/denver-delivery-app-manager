import { Component } from '@angular/core';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { EstabelecimentoProvider } from '../../../providers/estabelecimento/estabelecimento';
import { Estabelecimento } from '../../../model/estabelecimento';
import { CidadeProvider } from '../../../providers/cidade/cidade';
import { Cidade } from '../../../model/cidade';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';


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
    form: FormGroup;

    constructor(
        public imagePicker: ImagePicker,
        public base64: Base64,
        public estabelecimentoService: EstabelecimentoProvider,
        public cidadeService: CidadeProvider,
        public formBuilder: FormBuilder,
        public toastController: ToastController
    ) {
        this.buildFormValidator();
    }

    ionViewDidLoad() {
        this.listCidades();
    }

    private buildFormValidator() {
        this.form = new FormGroup({
            nome: new FormControl(this.estabelecimento.nome, Validators.required),
            descricao: new FormControl(this.estabelecimento.descricao, Validators.required),
            cidade: new FormControl(this.estabelecimento.idCidade, Validators.required),
        });
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

    save() {
        if (this.form.valid) {
            this.estabelecimento.nome = this.form.controls.nome.value;
            this.estabelecimento.descricao = this.form.controls.descricao.value;
            this.estabelecimento.idCidade = this.form.controls.cidade.value;
            this.saveEstabelecimento(this.estabelecimento);
        } else {

        }
    }

    private showMessage(message: string) {
        let toast = this.toastController.create({
            message: message,
            duration: 3000,
            showCloseButton: true
        });
        toast.present();
    }

    private saveEstabelecimento(estabelecimento: Estabelecimento) {
        this.estabelecimentoService.saveEstabelecimento(estabelecimento).subscribe(
            (data) => {
                this.saveImage(this.estabelecimentoService.dataToEstabelecimento(data));
            },
            (err) => {
                this.showMessage("Ocorreu um erro ao salvar o estabelecimento.");
            }
        );
    }

    private saveImage(estabelecimento: Estabelecimento) {
        if (this.imageURI) {
            this.estabelecimentoService.saveImage(this.imageURI, estabelecimento.id)
                .then((data) => {
                    console.log(data);
                }, (err) => {
                    console.log(err);
                });
        } else {
            this.showMessage("Estabelecimento salvo");
        }
    }
}
