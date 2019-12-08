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
import { FileTypeComponent, FileTypeModule } from 'ngx-formly-material-file';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_LOCALE_ID, ValidationMessages } from './validation-messages';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FileTypeModule.forRoot({
      // dropzoneText: 'Dateien hier ablegen oder',
      // browseFilesButtonText: 'Dateien durchsuchen',
      // removeFileTooltip: 'Datei entfernen'
    }),
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: ValidationMessages.requiredValidationMessage },
        { name: 'min', message: ValidationMessages.minValidationMessage },
        { name: 'max', message: ValidationMessages.maxValidationMessage },
        { name: 'maxFilenameLength', message: ValidationMessages.maxFilenameLengthMessage },
        { name: 'minFilenameLength', message: ValidationMessages.minFilenameLengthMessage },
        { name: 'fileExtension', message: ValidationMessages.fileExtensionMessage },
        { name: 'filesize', message: ValidationMessages.filesizeMessage },
        { name: 'filenameForbiddenCharacters', message: ValidationMessages.filenameForbiddenCharacters },
        { name: 'minFiles', message: ValidationMessages.minFilesMessage },
        { name: 'maxFiles', message: ValidationMessages.maxFilesMessage },
        { name: 'totalFilesize', message: ValidationMessages.totalFilesizeMessage },
        { name: 'uploadError', message: ValidationMessages.uploadErrorMessage }
      ],
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
  providers: [ {provide: LOCALE_ID, useValue: APP_LOCALE_ID } ],
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileDrop', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file-import.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'file', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileUpload', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file-upload.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileRemove', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/times.svg'));
  }
}
