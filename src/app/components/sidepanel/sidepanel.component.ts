import { Component } from '@angular/core';

@Component({
	selector: 'sidepanel',
	templateUrl: '../../templates/sidepanel/sidepanel.component.html',
	styleUrls: ['../../styles/sidepanel/sidepanel.component.less'],
})
export class SidebarComponent {
	fileName!: string;
	filePath!: string;
	width!: number;
	height!: number;
	fileSize!: string;
}
