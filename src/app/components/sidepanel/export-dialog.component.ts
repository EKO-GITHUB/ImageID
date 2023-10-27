import { Component } from '@angular/core';
import { FileHandlerService } from 'src/app/util/fileHandler.service';
import { IdentifiedImage, ImageProperties, Landmark, Logo, PageWithMatchingImage, SafeSearch } from 'src/app/components/sidepanel/identifiedImage.component';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'export-dialog',
	templateUrl: '../../templates/sidepanel/export-dialog.component.html',
	styleUrls: ['../../styles/sidepanel/export-dialog.component.less'],
})
export class ExportDialogComponent {
	constructor(public fileHandlerService: FileHandlerService, public messageService: MessageService) {}

	removeLandmark(identifiedImage: IdentifiedImage, landmark: Landmark) {
		let indexToRemove = identifiedImage.identifiedImage.landmarks.indexOf(landmark);
		identifiedImage.identifiedImage.landmarks.splice(indexToRemove, 1);
	}

	removeLogo(identifiedImage: IdentifiedImage, logo: Logo) {
		let indexToRemove = identifiedImage.identifiedImage.logos.indexOf(logo);
		identifiedImage.identifiedImage.logos.splice(indexToRemove, 1);
	}

	removeLabel(identifiedImage: IdentifiedImage, label: string) {
		let indexToRemove = identifiedImage.identifiedImage.labels.indexOf(label);
		identifiedImage.identifiedImage.labels.splice(indexToRemove, 1);
	}

	removeLocalizedObject(identifiedImage: IdentifiedImage, localizedObject: string) {
		let indexToRemove = identifiedImage.identifiedImage.localizedObjects.indexOf(localizedObject);
		identifiedImage.identifiedImage.localizedObjects.splice(indexToRemove, 1);
	}

	removeSafeSearch(identifiedImage: IdentifiedImage, safeSearch: SafeSearch) {
		let indexToRemove = identifiedImage.identifiedImage.safeSearch.indexOf(safeSearch);
		identifiedImage.identifiedImage.safeSearch.splice(indexToRemove, 1);
	}

	removeImageProperty(identifiedImage: IdentifiedImage, imageProperty: ImageProperties) {
		let indexToRemove = identifiedImage.identifiedImage.imageProperties.indexOf(imageProperty);
		identifiedImage.identifiedImage.imageProperties.splice(indexToRemove, 1);
	}

	removeWebDetection(identifiedImage: IdentifiedImage, webDetection: string) {
		let indexToRemove = identifiedImage.identifiedImage.webDetection.indexOf(webDetection);
		identifiedImage.identifiedImage.webDetection.splice(indexToRemove, 1);
	}

	removeFullMatchingImage(identifiedImage: IdentifiedImage, fullMatchingImage: string) {
		let indexToRemove = identifiedImage.identifiedImage.fullMatchingImages.indexOf(fullMatchingImage);
		identifiedImage.identifiedImage.fullMatchingImages.splice(indexToRemove, 1);
	}

	removePartialMatchingImage(identifiedImage: IdentifiedImage, partialMatchingImage: string) {
		let indexToRemove = identifiedImage.identifiedImage.partialMatchingImages.indexOf(partialMatchingImage);
		identifiedImage.identifiedImage.partialMatchingImages.splice(indexToRemove, 1);
	}

	removePageWithMatchingImage(identifiedImage: IdentifiedImage, pagesWithMatchingImage: PageWithMatchingImage) {
		let indexToRemove = identifiedImage.identifiedImage.pagesWithMatchingImage.indexOf(pagesWithMatchingImage);
		identifiedImage.identifiedImage.pagesWithMatchingImage.splice(indexToRemove, 1);
	}

	copyToClipboard(text: string) {
		let selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = text;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
		this.messageService.add({
			severity: 'info',
			summary: 'Copied',
			detail: 'Copied to clipboard',
		});
	}
}
