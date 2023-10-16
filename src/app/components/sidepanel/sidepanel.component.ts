import { Component } from '@angular/core';
import { VisibilityService } from 'src/app/util/visibilityService.service';

@Component({
	selector: 'sidepanel',
	templateUrl: '../../templates/sidepanel/sidepanel.component.html',
	styleUrls: ['../../styles/sidepanel/sidepanel.component.less'],
})
export class SidebarComponent {
	fileName: string = 'Select a file to show details';
	filePath!: string;
	width!: number;
	height!: number;
	fileSize!: string;

	constructor(public visibilityService: VisibilityService) {}

	identifySelected() {}
	identifyAll() {}
}
