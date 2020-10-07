import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormlyModule } from '@ngx-formly/core';
import { FileInputComponent } from './file-input/file-input.component';
import { FileSizePipe } from './file-size/file-size.pipe';
import { FileTypeConfig, FILE_TYPE_CONFIG } from './file-type-config';
import { FileTypeComponent } from './file-type/file-type.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTooltipModule,
    FormlyModule,
    MatFormFieldModule
  ],
  declarations: [
    FileTypeComponent,
    FileUploadComponent,
    FileSizePipe,
    FileInputComponent
  ]
})
export class FileTypeModule {

  constructor(
    @Optional() @SkipSelf() parentModule: FileTypeModule,
    matIconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    if (parentModule) {
      throw new Error(
        'FileTypeModule is already loaded. Import it in the AppModule only');
    }
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileDrop', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/file_copy-24px.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'file', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/cloud_done-24px.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileUpload', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/cloud_upload-24px.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileRemove', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/clear-24px.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileDownload', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/cloud_download-24px.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileUploadError', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/cloud_off-24px.svg'));
  }

  static forRoot(config: FileTypeConfig = {}): ModuleWithProviders<FileTypeModule> {
    const actualConfig: FileTypeConfig = {
      dropzoneText: config.dropzoneText ? config.dropzoneText : 'drag and drop files here or',
      browseFilesButtonText: config.browseFilesButtonText ? config.browseFilesButtonText : 'browse files',
      removeFileTooltip: config.removeFileTooltip ? config.removeFileTooltip : 'remove file'
    };

    return {
      ngModule: FileTypeModule,
      providers: [
        { provide: FILE_TYPE_CONFIG, useValue: actualConfig }
      ]
    };
  }

}
