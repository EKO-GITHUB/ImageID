import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SettingsService } from 'src/app/util/settingsService.service';

@Component({
	selector: 'settings-window',
	templateUrl: '../../templates/menu/settings-window.component.html',
	styleUrls: ['../../styles/menu/settings-window.component.less'],
})
export class SettingsWindowComponent {
	constructor(public settingsService: SettingsService, public messageService: MessageService) {}

	saveAllSettings() {
		this.settingsService.saveAllSettings();
		this.messageService.add({
			severity: 'info',
			summary: 'Saved',
			detail: 'Updated settings',
		});
	}
}
