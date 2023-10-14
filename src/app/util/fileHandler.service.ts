import { Injectable } from '@angular/core';
import { FileHandle } from './dragDrop.directive';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable()
export class FileHandlerService {
	files: FileHandle[] = [];

	constructor(public messageService: MessageService, private sanitizer: DomSanitizer) {}

	addFiles(files: FileHandle[]) {
		for (let file of files) {
			if (
				file.file.type != 'image/jpeg' &&
				file.file.type != 'image/png' &&
				file.file.type != 'image/tiff' &&
				file.file.type != 'image/bmp' &&
				file.file.type != 'image/gif' &&
				file.file.type != 'image/bmp' &&
				file.file.type != 'image/webp' &&
				file.file.type != 'image/vnd.microsoft.icon'
			) {
				this.messageService.add({
					severity: 'error',
					summary: 'Failed File ' + file.file.name,
					detail: 'File type ' + file.file.type + ' was not allowed',
				});
				return;
			}
			if (file.file.size > 20971520) {
				this.messageService.add({
					severity: 'error',
					summary: 'Failed File ' + file.file.name,
					detail: 'Google Cloud Vision only supports files up to 20 MB',
				});
				return;
			}

			this.files.push(file);
		}
	}

	getFiles(): FileHandle[] {
		return this.files;
	}

	createNewFileHandle(file: File): FileHandle {
		let filehandle: FileHandle = {
			file: file,
			url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
			selected: false,
		};
		return filehandle;
	}
}
