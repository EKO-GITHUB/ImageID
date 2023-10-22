export interface IdentifiedImage {
	id: number;
	fileName: string;
	landmarks: string[];
	logos: string[];
	labels: string[];
	texts: string[];
	localizedObjects: string[];
	safeSearch: SafeSearch[];
	imageProperties: ImageProperties[];
	fullTextAnnotation: string[];
	webDetection: string[];
	fullMatchingImages: string[];
	partialMatchingImages: string[];
	pagesWithMatchingImage: PageWithMatchingImage[];
	productSearchResults: string[];
	context: string[];
}

export interface SafeSearch {
	category: string;
	rating: string;
}

export interface ImageProperties {
	color: string;
	score: number;
	pixelFraction: number;
}

export interface PageWithMatchingImage {
	url: string;
	pageTitle: string;
}
