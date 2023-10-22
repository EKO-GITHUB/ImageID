import { Component } from '@angular/core';
import { FileHandlerService } from 'src/app/util/fileHandler.service';

@Component({
	selector: 'export-dialog',
	templateUrl: '../../templates/sidepanel/export-dialog.component.html',
	styleUrls: ['../../styles/sidepanel/export-dialog.component.less'],
})
export class ExportDialogComponent {
	constructor(public fileHandlerService: FileHandlerService) {}
}
