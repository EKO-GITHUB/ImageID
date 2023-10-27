import { Component } from '@angular/core';

@Component({
	selector: 'app-documentation-pdf',
	templateUrl: '../../templates/menu/documentation-pdf.component.html',
	styleUrls: ['../../styles/menu/documentation-pdf.component.less'],
})
export class DocumentationPDFComponent {
	pdfSource: string = 'assets/docs/Documentation.pdf';
}
