import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileHandlerService } from './fileHandler.service';

export interface FileHandle {
	id: number;
	file: File;
	url: SafeUrl;
	selected: boolean;
}

@Directive({
	selector: '[dragnanddrop]',
})
export class DragDirective {
	@Output() files: EventEmitter<FileHandle[]> = new EventEmitter();

	@HostBinding('style.background') private background = '#c242f7';

	constructor(private sanitizer: DomSanitizer, private filehandlerService: FileHandlerService) {}

	@HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = '#da82ff';
	}

	@HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = '#c242f7';
	}

	@HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = '#c242f7';
		let id: number;
		if (this.filehandlerService.getFiles().at(-1)) id = this.filehandlerService.getFiles().at(-1)!.id + 1;
		else id = 1;

		let files: FileHandle[] = [];
		for (let i = 0; i < evt.dataTransfer!.files.length; i++) {
			const file = evt.dataTransfer!.files[i];
			const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
			const selected: boolean = false;
			files.push({
				id,
				file,
				url,
				selected,
			});
			id++;
		}
		if (files.length > 0) {
			this.files.emit(files);
		}
	}
}
