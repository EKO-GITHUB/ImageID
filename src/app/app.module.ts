import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import PrimeNG modules
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DragDirective } from './util/dragDrop.directive';
import { FileSaverModule } from 'ngx-filesaver';

// own Components
import { AppComponent } from './components/app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainImagePanelComponent } from './components/mainImagePanel/main-image-panel.component';
import { SettingsWindowComponent } from './components/menu/settings-window.component';
import { LoadFromWebDialogComponent } from './components/menu/load-from-web-dialog.component';
import { AboutDialogComponent } from './components/menu/about-dialog.component';
import { DocumentationPDFComponent } from './components/menu/documentation-pdf.component';
import { SidebarComponent } from './components/sidepanel/sidepanel.component';
import { FileHandlerService } from './util/fileHandler.service';
import { VisibilityService } from './util/visibilityService.service';
import { ExportDialogComponent } from './components/sidepanel/export-dialog.component';
import { SettingsService } from './util/settingsService.service';

@NgModule({
	imports: [
		AvatarModule,
		AvatarGroupModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		AccordionModule,
		AutoCompleteModule,
		BadgeModule,
		BreadcrumbModule,
		BlockUIModule,
		ButtonModule,
		CalendarModule,
		CarouselModule,
		CascadeSelectModule,
		ChartModule,
		CheckboxModule,
		ChipsModule,
		ChipModule,
		ColorPickerModule,
		ConfirmDialogModule,
		ContextMenuModule,
		VirtualScrollerModule,
		DataViewModule,
		DialogModule,
		DividerModule,
		DockModule,
		DragDropModule,
		DropdownModule,
		DynamicDialogModule,
		EditorModule,
		FieldsetModule,
		FileUploadModule,
		GalleriaModule,
		InplaceModule,
		InputMaskModule,
		InputSwitchModule,
		InputTextModule,
		InputTextareaModule,
		InputNumberModule,
		ImageModule,
		KnobModule,
		ListboxModule,
		MegaMenuModule,
		MenuModule,
		MenubarModule,
		MessageModule,
		MessagesModule,
		MultiSelectModule,
		OrganizationChartModule,
		OrderListModule,
		OverlayPanelModule,
		PaginatorModule,
		PanelModule,
		PanelMenuModule,
		PasswordModule,
		PickListModule,
		ProgressSpinnerModule,
		ProgressBarModule,
		RadioButtonModule,
		RatingModule,
		SelectButtonModule,
		SidebarModule,
		ScrollerModule,
		ScrollPanelModule,
		ScrollTopModule,
		SkeletonModule,
		SlideMenuModule,
		SliderModule,
		SpeedDialModule,
		SpinnerModule,
		SplitterModule,
		SplitButtonModule,
		StepsModule,
		TableModule,
		TabMenuModule,
		TabViewModule,
		TagModule,
		TerminalModule,
		TieredMenuModule,
		TimelineModule,
		ToastModule,
		ToggleButtonModule,
		ToolbarModule,
		TooltipModule,
		TriStateCheckboxModule,
		TreeModule,
		TreeSelectModule,
		TreeTableModule,
		AnimateModule,
		CardModule,
		RouterModule.forRoot([{ path: '', component: AppComponent }]),
		NgxExtendedPdfViewerModule,
		FileSaverModule,
	],
	declarations: [
		AppComponent,
		MainImagePanelComponent,
		MenuComponent,
		SettingsWindowComponent,
		LoadFromWebDialogComponent,
		AboutDialogComponent,
		DocumentationPDFComponent,
		SidebarComponent,
		DragDirective,
		ExportDialogComponent,
	],
	providers: [DialogService, MessageService, FileHandlerService, VisibilityService, SettingsService],
	bootstrap: [AppComponent],
})
export class AppModule {}
