import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FileTypeComponent, FileTypeModule, FileTypeValidationMessages } from 'ngx-formly-material-file';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export const APP_LOCALE_ID = 'en-US';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FileTypeModule.forRoot(),
    // FileTypeModule.forRoot({
    //   dropzoneText: 'Dateien hier ablegen oder',
    //   browseFilesButtonText: 'Dateien durchsuchen',
    //   removeFileTooltip: 'Datei entfernen'
    // }),
    FormlyModule.forRoot({
      validationMessages: new FileTypeValidationMessages(APP_LOCALE_ID).validationMessages.concat([
        { name: 'required', message: 'This field is required' },
        { name: 'min', message: (_, field) => `This value should be more than ${field.templateOptions.min}` },
        { name: 'max', message: (_, field) => `This value should be less than ${field.templateOptions.max}` }
      ]),
      types: [
        { name: 'file', component: FileTypeComponent },
      ],
    }),
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    MatButtonModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: APP_LOCALE_ID }],
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // matIconRegistry.addSvgIconInNamespace('fileType', 'fileDrop', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file-import.svg'));
    // matIconRegistry.addSvgIconInNamespace('fileType', 'file', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file.svg'));
    // matIconRegistry.addSvgIconInNamespace('fileType', 'fileUpload', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file-upload.svg'));
    // matIconRegistry.addSvgIconInNamespace('fileType', 'fileRemove', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/times.svg'));
  }
}
