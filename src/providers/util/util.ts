import { Injectable } from '@angular/core';

@Injectable()
export class UtilProvider {

	getFileExtensions(imageUri: string): string {
		let array = imageUri.split(".");
		return array[array.length - 1];
	}
}
