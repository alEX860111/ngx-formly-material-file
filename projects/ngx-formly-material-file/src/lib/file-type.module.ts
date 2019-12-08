import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { MatTooltipModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormlyModule } from '@ngx-formly/core';
import { FileInputComponent } from './file-input/file-input.component';
import { FileSizePipe } from './file-size/file-size.pipe';
import { FileTypeConfig, FILE_TYPE_CONFIG } from './file-type-config';
import { FileTypeComponent } from './file-type/file-type.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

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
  ],
  declarations: [
    FileTypeComponent,
    FileUploadComponent,
    FileSizePipe,
    FileInputComponent
  ]
})
export class FileTypeModule {

  constructor(@Optional() @SkipSelf() parentModule: FileTypeModule) {
    if (parentModule) {
      throw new Error(
        'FileTypeModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: FileTypeConfig): ModuleWithProviders {
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
