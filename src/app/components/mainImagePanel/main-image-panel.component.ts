import { Component, Renderer2 } from '@angular/core';
import { FileHandle } from '../../util/dragDrop.directive';
import { MessageService } from 'primeng/api';
import { FileHandlerService } from 'src/app/util/fileHandler.service';

@Component({
	selector: 'main-image-panel',
	templateUrl: '../../templates/mainImagePanel/main-image-panel.component.html',
	styleUrls: ['../../styles/mainImagePanel/main-image-panel.component.less'],
})
export class MainImagePanelComponent {
	constructor(public messageService: MessageService, private fileHandlerService: FileHandlerService) {}

	filesDropped(files: FileHandle[]): void {
		this.fileHandlerService.addFiles(files);
	}

	getFiles(): FileHandle[] {
		return this.fileHandlerService.getFiles();
	}

	imageClick(filehandle: FileHandle) {
		if (filehandle.selected) filehandle.selected = false;
		else filehandle.selected = true;
		console.log('YOU CLICKED: ' + filehandle.file.name);
	}
}
