import { Component } from '@angular/core';
import { v4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { FileHandlerService } from '../../util/fileHandler.service';
import { FileHandle } from '../../util/dragDrop.directive';

@Component({
	selector: 'load-from-web-dialog',
	templateUrl: '../../templates/menu/load-from-web-dialog.component.html',
	styleUrls: ['../../styles/menu/load-from-web-dialog.component.less'],
})
export class LoadFromWebDialogComponent {
	loadFromWebURL!: string;

	constructor(private http: HttpClient, private fileHandlerService: FileHandlerService) {}
	load() {
		this.http.get(this.loadFromWebURL, { responseType: 'blob' }).subscribe((res) => {
			let file = new File([res], v4(), { type: res.type });
			let fileHandle = this.fileHandlerService.createNewFileHandle(file);
			let fileHandles: FileHandle[] = [fileHandle];
			this.fileHandlerService.addFiles(fileHandles);
		});
	}
}
