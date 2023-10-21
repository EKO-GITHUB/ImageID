import { Component } from '@angular/core';
import { FileHandlerService } from 'src/app/util/fileHandler.service';
import { VisibilityService } from 'src/app/util/visibilityService.service';

@Component({
	selector: 'sidepanel',
	templateUrl: '../../templates/sidepanel/sidepanel.component.html',
	styleUrls: ['../../styles/sidepanel/sidepanel.component.less'],
})
export class SidebarComponent {
	client;

	constructor(public visibilityService: VisibilityService, public fileHandlerService: FileHandlerService) {
		let vision = window.require('@google-cloud/vision');
		this.client = new vision.ImageAnnotatorClient();
	}

	async identifySelected() {
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
						{ type: 'PRODUCT_SEARCH' },
						{ type: 'SAFE_SEARCH_DETECTION' },
						{ type: 'WEB_DETECTION' },
					],
				};
				let [results] = await this.client.annotateImage(request);

				let imagePropertiesResults = results.imagePropertiesAnnotation;
				let labelResults = results.labelAnnotations;
				let landmarkResults = results.landmarkAnnotations;
				let logoDetectionResults = results.logoAnnotations;
				let productSearchResults = results.productSearchResults;
				let safeSearchResults = results.safeSearchAnnotation;
				let webDetectionResults = results.webDetection;

				console.log('imagePropertiesResults');
				console.log(JSON.stringify(imagePropertiesResults, null, 4));
				console.log('labelResults');
				console.log(JSON.stringify(labelResults, null, 4));
				console.log('landmarkResults');
				console.log(JSON.stringify(landmarkResults, null, 4));
				console.log('logoDetectionResults');
				console.log(JSON.stringify(logoDetectionResults, null, 4));
				console.log('productSearchResults');
				console.log(JSON.stringify(productSearchResults, null, 4));
				console.log('safeSearchResults');
				console.log(JSON.stringify(safeSearchResults, null, 4));
				console.log('webDetectionResults');
				console.log(JSON.stringify(webDetectionResults, null, 4));
				return;
			}
		}
	}

	identifyAll() {}
}
