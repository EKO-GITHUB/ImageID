import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoadFromWebDialogComponent } from './load-from-web-dialog.component';
import { SettingsWindowComponent } from './settings-window.component';
import { AboutDialogComponent } from './about-dialog.component';
import { DocumentationPDFComponent } from './documentation-pdf.component';
import { FileHandlerService } from '../../util/fileHandler.service';
import { FileHandle } from '../../util/dragDrop.directive';
import { VisibilityService } from 'src/app/util/visibilityService.service';

@Component({
	selector: 'menu',
	templateUrl: '../../templates/menu/menu.component.html',
	styleUrls: ['../../styles/menu/menu.component.less'],
	providers: [],
})
export class MenuComponent implements OnInit, OnDestroy {
	items!: MenuItem[];
	ref: DynamicDialogRef | undefined;

	constructor(
		public dialogService: DialogService,
		public messageService: MessageService,
		private fileHandlerService: FileHandlerService,
		private visibilityService: VisibilityService
	) {}

	ngOnInit(): void {
		this.items = [
			{
				label: 'File',
				icon: 'pi pi-fw pi-file',
				items: [
					{
						label: 'Load image from file system',
						icon: 'pi pi-file-import',
						command: () => this.fileUploadPrompt(),
					},
					{
						label: 'Load image from web',
						icon: 'pi pi-globe',
						command: () => this.showLoadFromWebDialog(),
					},
				],
			},
			{
				label: 'Settings',
				icon: 'pi pi-cog',
				command: () => this.showSettingsDialog(),
			},
			{
				label: 'View',
				icon: 'pi pi-eye',
				items: [
					{
						label: 'Show as gallery',
						icon: 'pi pi-images',
						visible: false,
						command: () => this.toggleDisplayAsGallery(),
					},
					{
						label: 'Show as list',
						icon: 'pi pi-list',
						visible: true,
						command: () => this.toggleDisplayAsGallery(),
					},
					{
						label: 'Show image preview',
						icon: 'pi pi-image',
						visible: false,
						command: () => this.toggleImagePreview(),
					},
					{
						label: 'Hide image preview',
						icon: 'pi pi-image',
						visible: true,
						command: () => this.toggleImagePreview(),
					},
					{
						label: 'Show image details',
						icon: 'pi pi-info-circle',
						visible: false,
						command: () => this.toggleImageDetails(),
					},
					{
						label: 'Hide image details',
						icon: 'pi pi-info-circle',
						visible: true,
						command: () => this.toggleImageDetails(),
					},
				],
			},
			{
				label: 'Help',
				icon: 'pi pi-question',
				items: [
					{
						label: 'Documentation',
						icon: 'pi pi-file-pdf',
						command: () => this.showDocumentationPDF(),
					},
					{
						label: 'About',
						icon: 'pi pi-question-circle',
						command: () => this.showAboutDialog(),
					},
					{
						label: 'GitLab repository',
						icon: 'pi pi-github',
						command: () => this.openGitLabRepository(),
					},
					{
						label: 'Keyboard shortcuts',
						icon: 'pi pi-chevron-right',
					},
				],
			},
		];
	}

	fileUploadPrompt(): void {
		const input = document.createElement('input');
		input.type = 'file';
		input.multiple = true;

		input.onchange = () => {
			let filelist = input.files as FileList;
			let fileHandleList: FileHandle[] = [];
			Array.from(filelist).forEach((file) => {
				let fileHandle: FileHandle = this.fileHandlerService.createNewFileHandle(file);
				fileHandleList.push(fileHandle);
			});
			this.fileHandlerService.addFiles(fileHandleList);
		};
		input.click();
	}

	showLoadFromWebDialog() {
		this.ref = this.dialogService.open(LoadFromWebDialogComponent, {
			header: 'Load from URL',
			contentStyle: { overflow: 'auto' },
			maximizable: false,
			modal: true,
		});
	}

	showSettingsDialog() {
		this.ref = this.dialogService.open(SettingsWindowComponent, {
			header: 'Settings',
			contentStyle: { overflow: 'auto' },
			maximizable: true,
			modal: true,
		});
	}

	showAboutDialog() {
		this.ref = this.dialogService.open(AboutDialogComponent, {
			header: 'Software information',
			contentStyle: { overflow: 'auto' },
			modal: true,
		});
	}

	ngOnDestroy() {
		if (this.ref) {
			this.ref.close();
		}
	}

	findMenuItemByLabel(label: string, items: MenuItem[]): MenuItem | undefined {
		for (let item of items) {
			if (item.items) {
				let submenuitem = this.findMenuItemByLabel(label, item.items);
				if (submenuitem) return submenuitem;
			} else if (item.label === label) {
				return item;
			}
		}
		return undefined;
	}

	toggleDisplayAsGallery() {
		let viewAsGallery = this.findMenuItemByLabel('Show as gallery', this.items);
		let viewAsList = this.findMenuItemByLabel('Show as list', this.items);
		viewAsGallery!.visible = !viewAsGallery?.visible;
		viewAsList!.visible = !viewAsList?.visible;
		this.visibilityService.setShowAsGallery(!viewAsGallery!.visible);
	}
	toggleImagePreview() {
		let showImagePreview = this.findMenuItemByLabel('Show image preview', this.items);
		let hideImagePreview = this.findMenuItemByLabel('Hide image preview', this.items);
		showImagePreview!.visible = !showImagePreview?.visible;
		hideImagePreview!.visible = !hideImagePreview?.visible;
		this.visibilityService.setPreviewVisible(hideImagePreview!.visible);
	}
	toggleImageDetails() {
		let showImageDetails = this.findMenuItemByLabel('Show image details', this.items);
		let hideImageDetails = this.findMenuItemByLabel('Hide image details', this.items);
		showImageDetails!.visible = !showImageDetails?.visible;
		hideImageDetails!.visible = !hideImageDetails?.visible;
		this.visibilityService.setDetailsVisible(hideImageDetails!.visible);
	}

	showDocumentationPDF() {
		this.ref = this.dialogService.open(DocumentationPDFComponent, {
			header: 'Documentation',
			height: '100%',
			width: '100%',
			modal: true,
		});
	}

	openGitLabRepository() {
		const url = 'https://gitlab.com/MTOCHIEV/imageidangular';
		window.open(url, '_blank');
	}
}
