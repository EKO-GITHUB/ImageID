import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
	Store = window.require('electron-store');
	storage = new this.Store();

	identifyLandmarks: boolean;
	identifyLogos: boolean;
	identifyLabels: boolean;
	identifyLocalizedObjects: boolean;
	identifySafeSearch: boolean;
	identifyImageProperties: boolean;
	identifyWebDetection: boolean;
	identifyFullMatchingImages: boolean;
	identifyPartialMatchingImages: boolean;
	identifyPagesWithMatchingImages: boolean;

	identifyLandmarksMinScore: number;
	identifyLabelsMinScore: number;
	identifyLogosMinScore: number;
	identifyLocalizedObjectsMinScore: number;
	identifyImagePropertyColorMinScore: number;
	identifyWebDetectionMinScore: number;
	identifySafeSearchFilterAdultMaxScore: string;
	identifySafeSearchFilterViolenceMaxScore: string;
	identifySafeSearchFilterRacyMaxScore: string;
	identifySafeSearchFilterSpoofMaxScore: string;
	identifySafeSearchFilterMedicalMaxScore: string;

	safeSearchOptions = ['UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE', 'LIKELY', 'VERY_LIKELY'];

	constructor() {
		let defaultIdentifyLandmarks = this.storage.get('identifyLandmarks');
		let defaultIdentifyLogos = this.storage.get('identifyLogos');
		let defaultIdentifyLabels = this.storage.get('identifyLabels');
		let defaultIdentifyLocalizedObjects = this.storage.get('identifyLocalizedObjects');
		let defaultIdentifySafeSearch = this.storage.get('identifySafeSearch');
		let defaultIdentifyImageProperties = this.storage.get('identifyImageProperties');
		let defaultIdentifyWebDetection = this.storage.get('identifyWebDetection');
		let defaultIdentifyFullMatchingImages = this.storage.get('identifyFullMatchingImages');
		let defaultIdentifyPartialMatchingImages = this.storage.get('identifyPartialMatchingImages');
		let defaultIdentifyPagesWithMatchingImages = this.storage.get('identifyPagesWithMatchingImages');

		let defaultIdentifyLandmarksMinScore = this.storage.get('identifyLandmarksMinScore');
		let defaultidentifyLabelsMinScore = this.storage.get('identifyLabelsMinScore');
		let defaultidentifyLogosMinScore = this.storage.get('identifyLogosMinScore');
		let defaultidentifyLocalizedObjectsMinScore = this.storage.get('identifyLocalizedObjectsMinScore');
		let defaultidentifyImagePropertyColorMinScore = this.storage.get('identifyImagePropertyColorMinScore');
		let defaultidentifyWebDetectionMinScore = this.storage.get('identifyWebDetectionMinScore');
		let defaultidentifySafeSearchFilterAdultMaxScore = this.storage.get('identifySafeSearchFilterAdultMaxScore');
		let defaultidentifySafeSearchFilterViolenceMaxScore = this.storage.get('identifySafeSearchFilterViolenceMaxScore');
		let defaultidentifySafeSearchFilterRacyMaxScore = this.storage.get('identifySafeSearchFilterRacyMaxScore');
		let defaultidentifySafeSearchFilterSpoofMaxScore = this.storage.get('identifySafeSearchFilterSpoofMaxScore');
		let defaultidentifySafeSearchFilterMedicalMaxScore = this.storage.get('identifySafeSearchFilterMedicalMaxScore');

		if (defaultIdentifyLandmarks == null) {
			defaultIdentifyLandmarks = true;
			this.storage.set('identifyLandmarks', defaultIdentifyLandmarks);
		}
		if (defaultIdentifyLogos == null) {
			defaultIdentifyLogos = true;
			this.storage.set('identifyLogos', defaultIdentifyLogos);
		}
		if (defaultIdentifyLabels == null) {
			defaultIdentifyLabels = true;
			this.storage.set('identifyLabels', defaultIdentifyLabels);
		}
		if (defaultIdentifyLocalizedObjects == null) {
			defaultIdentifyLocalizedObjects = true;
			this.storage.set('identifyLocalizedObjects', defaultIdentifyLocalizedObjects);
		}
		if (defaultIdentifySafeSearch == null) {
			defaultIdentifySafeSearch = true;
			this.storage.set('identifySafeSearch', defaultIdentifySafeSearch);
		}
		if (defaultIdentifyImageProperties == null) {
			defaultIdentifyImageProperties = true;
			this.storage.set('identifyImageProperties', defaultIdentifyImageProperties);
		}
		if (defaultIdentifyWebDetection == null) {
			defaultIdentifyWebDetection = true;
			this.storage.set('identifyWebDetection', defaultIdentifyWebDetection);
		}
		if (defaultIdentifyFullMatchingImages == null) {
			defaultIdentifyFullMatchingImages = true;
			this.storage.set('identifyFullMatchingImages', defaultIdentifyFullMatchingImages);
		}
		if (defaultIdentifyPartialMatchingImages == null) {
			defaultIdentifyPartialMatchingImages = true;
			this.storage.set('identifyPartialMatchingImages', defaultIdentifyPartialMatchingImages);
		}
		if (defaultIdentifyPagesWithMatchingImages == null) {
			defaultIdentifyPagesWithMatchingImages = true;
			this.storage.set('identifyPagesWithMatchingImages', defaultIdentifyPagesWithMatchingImages);
		}
		if (defaultIdentifyLandmarksMinScore == null) {
			defaultIdentifyLandmarksMinScore = 0;
			this.storage.set('identifyLandmarksMinScore', defaultIdentifyLandmarksMinScore);
		}
		if (defaultidentifyLabelsMinScore == null) {
			defaultidentifyLabelsMinScore = 0;
			this.storage.set('identifyLabelsMinScore', defaultidentifyLabelsMinScore);
		}
		if (defaultidentifyLogosMinScore == null) {
			defaultidentifyLogosMinScore = 0;
			this.storage.set('identifyLogosMinScore', defaultidentifyLogosMinScore);
		}
		if (defaultidentifyLocalizedObjectsMinScore == null) {
			defaultidentifyLocalizedObjectsMinScore = 0;
			this.storage.set('identifyLocalizedObjectsMinScore', defaultidentifyLocalizedObjectsMinScore);
		}
		if (defaultidentifyImagePropertyColorMinScore == null) {
			defaultidentifyImagePropertyColorMinScore = 0;
			this.storage.set('identifyImagePropertyColorMinScore', defaultidentifyImagePropertyColorMinScore);
		}
		if (defaultidentifyWebDetectionMinScore == null) {
			defaultidentifyWebDetectionMinScore = 0;
			this.storage.set('identifyWebDetectionMinScore', defaultidentifyWebDetectionMinScore);
		}
		if (defaultidentifySafeSearchFilterAdultMaxScore == null) {
			defaultidentifySafeSearchFilterAdultMaxScore = 'VERY_UNLIKELY';
			this.storage.set('identifySafeSearchFilterAdultMaxScore', defaultidentifySafeSearchFilterAdultMaxScore);
		}
		if (defaultidentifySafeSearchFilterViolenceMaxScore == null) {
			defaultidentifySafeSearchFilterViolenceMaxScore = 'VERY_UNLIKELY';
			this.storage.set('identifySafeSearchFilterViolenceMaxScore', defaultidentifySafeSearchFilterViolenceMaxScore);
		}
		if (defaultidentifySafeSearchFilterRacyMaxScore == null) {
			defaultidentifySafeSearchFilterRacyMaxScore = 'VERY_UNLIKELY';
			this.storage.set('identifySafeSearchFilterRacyMaxScore', defaultidentifySafeSearchFilterRacyMaxScore);
		}
		if (defaultidentifySafeSearchFilterSpoofMaxScore == null) {
			defaultidentifySafeSearchFilterSpoofMaxScore = 'VERY_UNLIKELY';
			this.storage.set('identifySafeSearchFilterSpoofMaxScore', defaultidentifySafeSearchFilterSpoofMaxScore);
		}
		if (defaultidentifySafeSearchFilterMedicalMaxScore == null) {
			defaultidentifySafeSearchFilterMedicalMaxScore = 'VERY_UNLIKELY';
			this.storage.set('identifySafeSearchFilterMedicalMaxScore', defaultidentifySafeSearchFilterMedicalMaxScore);
		}

		this.identifyLandmarks = defaultIdentifyLandmarks;
		this.identifyLogos = defaultIdentifyLogos;
		this.identifyLabels = defaultIdentifyLabels;
		this.identifyLocalizedObjects = defaultIdentifyLocalizedObjects;
		this.identifySafeSearch = defaultIdentifySafeSearch;
		this.identifyImageProperties = defaultIdentifyImageProperties;
		this.identifyWebDetection = defaultIdentifyWebDetection;
		this.identifyFullMatchingImages = defaultIdentifyFullMatchingImages;
		this.identifyPartialMatchingImages = defaultIdentifyPartialMatchingImages;
		this.identifyPagesWithMatchingImages = defaultIdentifyPagesWithMatchingImages;

		this.identifyLandmarksMinScore = defaultIdentifyLandmarksMinScore;
		this.identifyLabelsMinScore = defaultidentifyLabelsMinScore;
		this.identifyLogosMinScore = defaultidentifyLogosMinScore;
		this.identifyLocalizedObjectsMinScore = defaultidentifyLocalizedObjectsMinScore;
		this.identifyImagePropertyColorMinScore = defaultidentifyImagePropertyColorMinScore;
		this.identifyWebDetectionMinScore = defaultidentifyWebDetectionMinScore;
		this.identifySafeSearchFilterAdultMaxScore = defaultidentifySafeSearchFilterAdultMaxScore;
		this.identifySafeSearchFilterViolenceMaxScore = defaultidentifySafeSearchFilterViolenceMaxScore;
		this.identifySafeSearchFilterRacyMaxScore = defaultidentifySafeSearchFilterRacyMaxScore;
		this.identifySafeSearchFilterSpoofMaxScore = defaultidentifySafeSearchFilterSpoofMaxScore;
		this.identifySafeSearchFilterMedicalMaxScore = defaultidentifySafeSearchFilterMedicalMaxScore;
	}

	getSetting(key: string) {
		return this.storage.get(key);
	}

	saveAllSettings() {
		this.storage.set('identifyLandmarks', this.identifyLandmarks);
		this.storage.set('identifyLogos', this.identifyLogos);
		this.storage.set('identifyLabels', this.identifyLabels);
		this.storage.set('identifyLocalizedObjects', this.identifyLocalizedObjects);
		this.storage.set('identifySafeSearch', this.identifySafeSearch);
		this.storage.set('identifyImageProperties', this.identifyImageProperties);
		this.storage.set('identifyWebDetection', this.identifyWebDetection);
		this.storage.set('identifyFullMatchingImages', this.identifyFullMatchingImages);
		this.storage.set('identifyPartialMatchingImages', this.identifyPartialMatchingImages);
		this.storage.set('identifyPagesWithMatchingImages', this.identifyPagesWithMatchingImages);
		this.storage.set('identifyLandmarksMinScore', this.identifyLandmarksMinScore);
		this.storage.set('identifyLabelsMinScore', this.identifyLabelsMinScore);
		this.storage.set('identifyLogosMinScore', this.identifyLogosMinScore);
		this.storage.set('identifyLocalizedObjectsMinScore', this.identifyLocalizedObjectsMinScore);
		this.storage.set('identifyImagePropertyColorMinScore', this.identifyImagePropertyColorMinScore);
		this.storage.set('identifyWebDetectionMinScore', this.identifyWebDetectionMinScore);
		this.storage.set('identifySafeSearchFilterAdultMaxScore', this.identifySafeSearchFilterAdultMaxScore);
		this.storage.set('identifySafeSearchFilterViolenceMaxScore', this.identifySafeSearchFilterViolenceMaxScore);
		this.storage.set('identifySafeSearchFilterRacyMaxScore', this.identifySafeSearchFilterRacyMaxScore);
		this.storage.set('identifySafeSearchFilterSpoofMaxScore', this.identifySafeSearchFilterSpoofMaxScore);
		this.storage.set('identifySafeSearchFilterMedicalMaxScore', this.identifySafeSearchFilterMedicalMaxScore);
	}
}
