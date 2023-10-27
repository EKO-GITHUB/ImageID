export interface IdentifiedImage {
	identifiedImage: {
		id: number;
		fileName: string;
		landmarks: Landmark[];
		logos: Logo[];
		labels: string[];
		localizedObjects: string[];
		safeSearch: SafeSearch[];
		imageProperties: ImageProperties[];
		webDetection: string[];
		fullMatchingImages: string[];
		partialMatchingImages: string[];
		pagesWithMatchingImage: PageWithMatchingImage[];
	};
}

export interface SafeSearch {
	color: string;
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

export interface Landmark {
	description: string;
	latitude: number;
	longitude: number;
	score: number;
}

export interface Logo {
	description: string;
	score: number;
}
