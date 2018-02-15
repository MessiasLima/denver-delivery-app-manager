import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'error-message',
	templateUrl: 'error-message.html'
})
export class ErrorMessageComponent {

	@Input() message: string;
	@Output() action: EventEmitter<any> = new EventEmitter();

	constructor() {
		this.message = "Ocorreu um erro inesperado";
	}

	doAction(){
		if (this.action){
			this.action.emit();
		}
	}
}
