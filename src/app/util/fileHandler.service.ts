import { Injectable } from '@angular/core';
import { FileHandle } from './dragDrop.directive';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IdentifiedImage } from '../styles/sidepanel/identifiedImage.component';

@Injectable()
export class FileHandlerService {
	files: FileHandle[] = [];
	fileLastClickedOn!: FileHandle;

	selectedFilePreviewURL: SafeUrl = 'assets/images/noImageSelected.png';
	selectedFileName: string = 'Select a file to show details';
	selectedFilePath!: string;
	selectedFileWidth!: string;
	selectedFileHeight!: string;
	selectedFileSize!: string;
	selectedFileSrc!: string;

	identifySelectedButtonDisabled: boolean = true;
	identifyAllButtonDisabled: boolean = true;
	exportButtonDisabled: boolean = true;

	identifiedImages: IdentifiedImage[] = [];

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
		let id: number;
		if (this.files.at(-1)) id = this.files.at(-1)!.id + 1;
		else id = 1;
		let filehandle: FileHandle = {
			id: id,
			file: file,
			url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
			selected: false,
		};
		return filehandle;
	}

	isAnySelected(): boolean {
		let anySelected: boolean = false;
		for (let file of this.files) {
			if (file.selected) anySelected = true;
		}
		return anySelected;
	}

	getNumberOfSelectedFiles(): number {
		let nrOfSelectedFiles: number = 0;
		for (let file of this.files) {
			if (file.selected) nrOfSelectedFiles++;
		}
		return nrOfSelectedFiles;
	}

	setLastClickedOn(fileHandle: FileHandle) {
		this.fileLastClickedOn = fileHandle;
	}

	getFileHandleByIndex(index: number): FileHandle | undefined {
		for (let file of this.files) {
			if (file.id == index) {
				return file;
			}
		}
		return undefined;
	}

	convertBitSizeToText(sizeInBits: number): string {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (sizeInBits == 0) return 'n/a';
		let i = Math.floor(Math.log(sizeInBits) / Math.log(1024));
		if (i == 0) return sizeInBits + ' ' + sizes[i];
		return (sizeInBits / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
	}
}
