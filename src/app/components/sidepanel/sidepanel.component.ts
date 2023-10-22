import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileHandlerService } from 'src/app/util/fileHandler.service';
import { VisibilityService } from 'src/app/util/visibilityService.service';
import { ExportDialogComponent } from './export-dialog.component';
import { IdentifiedImage, ImageProperties, PageWithMatchingImage, SafeSearch } from 'src/app/styles/sidepanel/identifiedImage.component';

@Component({
	selector: 'sidepanel',
	templateUrl: '../../templates/sidepanel/sidepanel.component.html',
	styleUrls: ['../../styles/sidepanel/sidepanel.component.less'],
})
export class SidebarComponent {
	client;
	ref: DynamicDialogRef | undefined;

	constructor(
		public visibilityService: VisibilityService,
		public fileHandlerService: FileHandlerService,
		public dialogService: DialogService,
		public messageService: MessageService
	) {
		let vision = window.require('@google-cloud/vision');
		this.client = new vision.ImageAnnotatorClient();
	}

	async identifySelected() {
		this.messageService.add({
			severity: 'info',
			summary: 'Identifying',
			detail: 'Identifying selected images (' + this.fileHandlerService.getNumberOfSelectedFiles() + ' files)',
		});
		this.fileHandlerService.identifySelectedButtonDisabled = true;
		this.fileHandlerService.identifyAllButtonDisabled = true;
		this.fileHandlerService.identifiedImages = [];

		for (let file of this.fileHandlerService.getFiles()) {
			if (file.selected) {
				let encoded = Buffer.from(await file.file.arrayBuffer()).toString('base64');
				const request = {
					image: {
						content: encoded,
					},
					features: [
						{ type: 'IMAGE_PROPERTIES' },
						{ type: 'LABEL_DETECTION' },
						{ type: 'LANDMARK_DETECTION' },
						{ type: 'LOGO_DETECTION' },
						{ type: 'OBJECT_LOCALIZATION' },
						{ type: 'PRODUCT_SEARCH' },
						{ type: 'SAFE_SEARCH_DETECTION' },
						{ type: 'TEXT_DETECTION' },
						{ type: 'WEB_DETECTION' },
					],
				};
				let [results] = await this.client.annotateImage(request);
				let imagePropertiesResults = results.imagePropertiesAnnotation;
				let labelResults = results.labelAnnotations;
				let landmarkResults = results.landmarkAnnotations;
				let logoDetectionResults = results.logoAnnotations;
				let objectLocalizationResults = results.localizedObjectAnnotations;
				let productSearchResults = results.productSearchResults;
				let safeSearchResults = results.safeSearchAnnotation;
				let textResults = results.textAnnotations;
				let webDetectionResults = results.webDetection;

				//labels
				let labelDescriptions: string[] = [];
				labelResults.forEach((label: { score: number; description: string }) => {
					if (label.score > 0) labelDescriptions.push(label.description);
				});
				labelDescriptions = labelDescriptions.filter(this.onlyUnique);

				//objects
				let localizedObjects: string[] = [];
				objectLocalizationResults.forEach((object: { score: number; name: string }) => {
					if (object.score > 0) localizedObjects.push(object.name);
				});
				localizedObjects = localizedObjects.filter(this.onlyUnique);

				//safeSearch
				let safeSearch: SafeSearch[] = [];
				let safeSearchAdult: SafeSearch = { category: 'adult', rating: safeSearchResults.adult };
				let safeSearchSpoof: SafeSearch = { category: 'spoof', rating: safeSearchResults.spoof };
				let safeSearchMedical: SafeSearch = { category: 'medical', rating: safeSearchResults.medical };
				let safeSearchViolence: SafeSearch = { category: 'violence', rating: safeSearchResults.violence };
				let safeSearchRacy: SafeSearch = { category: 'racy', rating: safeSearchResults.racy };
				safeSearch.push(safeSearchAdult, safeSearchSpoof, safeSearchMedical, safeSearchViolence, safeSearchRacy);

				//image Properties
				let imageProperties: ImageProperties[] = [];
				imagePropertiesResults.dominantColors.colors.forEach(
					(colorItem: { color: { red: string; green: string; blue: string; alpha: string }; score: any; pixelFraction: any }) => {
						let imageProperty: ImageProperties = {
							color: this.RGBToHex(colorItem.color.red, colorItem.color.green, colorItem.color.blue, colorItem.color.alpha),
							score: colorItem.score,
							pixelFraction: colorItem.pixelFraction,
						};
						imageProperties.push(imageProperty);
					}
				);

				//webDetection
				let webDetectionDescriptions: string[] = [];
				let fullMatchingImages: string[] = [];
				let partialMatchingImages: string[] = [];
				let pagesWithMatchingImage: PageWithMatchingImage[] = [];
				let bestGuess: string;
				webDetectionResults.webEntities.forEach((entity: { score: number; description: string }) => {
					if (entity.score > 0) webDetectionDescriptions.push(entity.description);
				});
				webDetectionResults.fullMatchingImages.forEach((fullMatchingImage: { url: string }) => {
					fullMatchingImages.push(fullMatchingImage.url);
				});

				webDetectionResults.partialMatchingImages.forEach((partialMatchingImage: { url: string }) => {
					partialMatchingImages.push(partialMatchingImage.url);
				});
				webDetectionResults.pagesWithMatchingImages.forEach((pageWithMatchingImage: { url: any; pageTitle: any }) => {
					let newPageWithMatchingImage: PageWithMatchingImage = {
						url: pageWithMatchingImage.url,
						pageTitle: pageWithMatchingImage.pageTitle,
					};
					pagesWithMatchingImage.push(newPageWithMatchingImage);
				});
				webDetectionResults.bestGuessLabels.forEach((bestGuessLabel: { label: string }) => {
					labelDescriptions.push(bestGuessLabel.label);
				});

				let identifiedImage: IdentifiedImage = {
					id: file.id,
					fileName: file.file.name,
					landmarks: [],
					logos: [],
					labels: labelDescriptions,
					texts: [],
					localizedObjects: localizedObjects,
					safeSearch: safeSearch,
					imageProperties: imageProperties,
					fullTextAnnotation: [],
					webDetection: webDetectionDescriptions,
					fullMatchingImages: fullMatchingImages,
					partialMatchingImages: partialMatchingImages,
					pagesWithMatchingImage: pagesWithMatchingImage,
					productSearchResults: [],
					context: [],
				};

				this.fileHandlerService.identifiedImages.push(identifiedImage);
			}
		}

		console.log(JSON.stringify(this.fileHandlerService.identifiedImages, null, 4));

		this.fileHandlerService.identifySelectedButtonDisabled = false;
		this.fileHandlerService.identifyAllButtonDisabled = false;
		this.fileHandlerService.exportButtonDisabled = false;

		this.messageService.add({
			severity: 'success',
			summary: 'Finished',
			detail: 'Identification finished',
		});
	}

	identifyAll() {}

	showExportDialog() {
		this.ref = this.dialogService.open(ExportDialogComponent, {
			header: 'Export Image Tags',
			height: '100%',
			width: '100%',
			modal: true,
		});
	}

	onlyUnique(value: any, index: any, array: string | any[]) {
		return array.indexOf(value) === index;
	}

	RGBToHex(r: string, g: string, b: string, a: string) {
		if (a === null) a = '1';
		r = parseInt(r, 10).toString(16);
		g = parseInt(g, 10).toString(16);
		b = parseInt(b, 10).toString(16);
		a = Math.round(parseInt(a, 10) * 255).toString(16);

		if (r.length == 1) r = '0' + r;
		if (g.length == 1) g = '0' + g;
		if (b.length == 1) b = '0' + b;
		if (a.length == 1) a = '0' + a;

		return '#' + r + g + b + a;
	}
}
