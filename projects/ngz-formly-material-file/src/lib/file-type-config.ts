import { InjectionToken } from '@angular/core';

export const FILE_TYPE_CONFIG = new InjectionToken<FileTypeConfig>('FileTypeConfig');

export interface FileTypeConfig {

  readonly dropzoneText?: string;

  readonly browseFilesButtonText?: string;

  readonly removeFileTooltip?: string;

}
