import { Injectable } from '@angular/core';

@Injectable()
export class VisibilityService {
	previewVisible: boolean = true;
	detailsVisible: boolean = true;
	showAsGallery: boolean = true;

	constructor() {}

	setPreviewVisible(visible: boolean) {
		this.previewVisible = visible;
	}

	setDetailsVisible(visible: boolean) {
		this.detailsVisible = visible;
	}

	setShowAsGallery(visible: boolean) {
		this.showAsGallery = visible;
	}
}
