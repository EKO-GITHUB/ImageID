import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
	selector: 'app-root',
	templateUrl: '../templates/app.component.html',
	styleUrls: ['../styles/app.component.less'],
})
export class AppComponent implements OnInit {
	constructor(private primengConfig: PrimeNGConfig) {}

	ngOnInit() {
		this.primengConfig.ripple = true;
	}
}
