import { Component, Renderer2 } from '@angular/core';
import { FileHandle } from '../../util/dragDrop.directive';
import { MessageService } from 'primeng/api';
import { FileHandlerService } from 'src/app/util/fileHandler.service';
import { VisibilityService } from 'src/app/util/visibilityService.service';

@Component({
	selector: 'main-image-panel',
	templateUrl: '../../templates/mainImagePanel/main-image-panel.component.html',
	styleUrls: ['../../styles/mainImagePanel/main-image-panel.component.less'],
})
export class MainImagePanelComponent {
	constructor(public messageService: MessageService, private fileHandlerService: FileHandlerService, public visibilityService: VisibilityService) {}

	filesDropped(files: FileHandle[]): void {
		this.fileHandlerService.addFiles(files);
	}

	getFiles(): FileHandle[] {
		return this.fileHandlerService.getFiles();
	}

	imageClick(filehandle: FileHandle, $event: MouseEvent) {
		if ($event.shiftKey) {
			if (!this.fileHandlerService.isAnySelected()) {
				filehandle.selected = true;
				this.fileHandlerService.fileLastClickedOn = filehandle;
			} else {
				let fileLastClickedOn: FileHandle = this.fileHandlerService.fileLastClickedOn;
				let startIndex: number = fileLastClickedOn.id;
				let endIndex: number = filehandle.id;
				if (startIndex > endIndex) {
					[startIndex, endIndex] = [endIndex, startIndex];
				}
				for (let index = startIndex; index <= endIndex; index++) {
					this.fileHandlerService.getFileHandleByIndex(index)!.selected = true;
				}
			}
		} else if ($event.ctrlKey) {
			filehandle.selected = !filehandle.selected;
		} else {
			let isSelected: boolean = filehandle.selected;

			if (this.fileHandlerService.getNumberOfSelectedFiles() > 1) {
				for (let file of this.fileHandlerService.getFiles()) {
					file.selected = false;
				}
				filehandle.selected = true;
			} else if (this.fileHandlerService.getNumberOfSelectedFiles() == 0) {
				for (let file of this.fileHandlerService.getFiles()) {
					file.selected = false;
				}
				filehandle.selected = true;
			} else if (this.fileHandlerService.getNumberOfSelectedFiles() == 1) {
				for (let file of this.fileHandlerService.getFiles()) {
					file.selected = false;
				}
				filehandle.selected = !isSelected;
			}

			this.fileHandlerService.fileLastClickedOn = filehandle;
		}
	}
}
