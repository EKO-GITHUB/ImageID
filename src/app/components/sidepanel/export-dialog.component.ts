import { Component, OnInit, Renderer2, RendererFactory2, ViewContainerRef } from '@angular/core';
import { FileHandlerService } from 'src/app/util/fileHandler.service';
import { ExportDialogHeader } from './export-dialog-header.component';

@Component({
	selector: 'export-dialog',
	templateUrl: '../../templates/sidepanel/export-dialog.component.html',
	styleUrls: ['../../styles/sidepanel/export-dialog.component.less'],
})
export class ExportDialogComponent implements OnInit {
	private renderer: Renderer2;
	constructor(public fileHandlerService: FileHandlerService, private readonly rendererFactory: RendererFactory2, private viewContainerRef: ViewContainerRef) {
		this.renderer = rendererFactory.createRenderer(null, null);
	}

	ngOnInit() {
		const componentRef = this.viewContainerRef.createComponent(ExportDialogHeader);
		let titleSpan = document.getElementsByClassName('p-dialog-title')[0];
		this.renderer.appendChild(titleSpan, componentRef.location.nativeElement);
	}
}
