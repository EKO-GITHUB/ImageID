import { ChangeDetectorRef, Component } from '@angular/core';
import { FileHandle } from '../../util/dragDrop.directive';
import { FileHandlerService } from 'src/app/util/fileHandler.service';
import { VisibilityService } from 'src/app/util/visibilityService.service';

@Component({
	selector: 'main-image-panel',
	templateUrl: '../../templates/mainImagePanel/main-image-panel.component.html',
	styleUrls: ['../../styles/mainImagePanel/main-image-panel.component.less'],
})
export class MainImagePanelComponent {
	constructor(public fileHandlerService: FileHandlerService, public visibilityService: VisibilityService) {}

	filesDropped(files: FileHandle[]): void {
		this.fileHandlerService.addFiles(files);
	}

	imageClick(filehandle: FileHandle, $event: MouseEvent) {
		// Image Selection
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

		// Image Details
		if (this.fileHandlerService.getNumberOfSelectedFiles() == 0) {
			this.fileHandlerService.selectedFilePreviewURL = 'assets/images/noImageSelected.png';
			this.fileHandlerService.selectedFileName = 'Select an image to show  details';
			this.fileHandlerService.selectedFileHeight = ' ';
			this.fileHandlerService.selectedFileWidth = ' ';
			this.fileHandlerService.selectedFileSize = ' ';
		} else if (this.fileHandlerService.getNumberOfSelectedFiles() == 1) {
			for (let file of this.fileHandlerService.getFiles()) {
				if (file.selected) {
					this.fileHandlerService.selectedFileSize = this.fileHandlerService.convertBitSizeToText(file.file.size);
					this.fileHandlerService.selectedFilePreviewURL = file.url;
					this.fileHandlerService.selectedFileName = file.file.name;
					this.fileHandlerService.selectedFilePath = file.file.webkitRelativePath;
					this.fileHandlerService.selectedFileWidth = this.fileHandlerService.imageMapWidth.get(file.file.name) || '0';
					this.fileHandlerService.selectedFileHeight = this.fileHandlerService.imageMapHeight.get(file.file.name) || '0';
				}
			}
		} else if (this.fileHandlerService.getNumberOfSelectedFiles() > 1) {
			let totalFileSize: number = 0;
			for (let selectedFile of this.fileHandlerService.getFiles()) {
				if (selectedFile.selected) totalFileSize += selectedFile.file.size;
			}
			this.fileHandlerService.selectedFileName = 'Multiple files selected';
			this.fileHandlerService.selectedFileHeight = 'Multiple files selected';
			this.fileHandlerService.selectedFileWidth = 'Multiple files selected';
			this.fileHandlerService.selectedFileSize = this.fileHandlerService.convertBitSizeToText(totalFileSize);
		}

		// Identify Buttons
		if (this.fileHandlerService.getNumberOfSelectedFiles() == 0) {
			this.fileHandlerService.identifySelectedButtonDisabled = true;
		} else {
			this.fileHandlerService.identifySelectedButtonDisabled = false;
		}
	}
}
