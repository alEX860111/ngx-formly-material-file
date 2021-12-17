import { FormlyFieldConfig } from '@ngx-formly/core';
import { FileSizePipe } from './file-size/file-size.pipe';
import { MaxFilesError } from './list-validators/max-files-error';
import { MinFilesError } from './list-validators/min-files-error';
import { TotalFilesizeError } from './list-validators/total-filesize-error';
import { FileExtensionError } from './validators/file-extension-error';
import { FilenameForbiddenCharactersError } from './validators/filename-forbidden-characters-error';
import { FilesizeError } from './validators/filesize-error';
import { MaxFilenameLengthError } from './validators/max-filename-length-error';
import { MinFilenameLengthError } from './validators/min-filename-length-error';

export class FileTypeValidationMessages {

  private readonly fileSizePipe: FileSizePipe;

  constructor(localId: string) {
    this.fileSizePipe = new FileSizePipe(localId);
  }

  get validationMessages(): {
    name: string;
    message: string | ((error: any, field: FormlyFieldConfig) => string);
  }[] {

    return [
      {
        name: 'maxFilenameLength', message: (err: MaxFilenameLengthError) => {
          return `The filename is too long. Max length: ${err.maxFilenameLength}`;
        }
      },
      {
        name: 'minFilenameLength', message: (err: MinFilenameLengthError) => {
          return `The filename is too short. Min length: ${err.minFilenameLength}`;
        }
      },
      {
        name: 'fileExtension', message: (err: FileExtensionError) => {
          const allowedFileExtensions = err.allowedFileExtensions
            .map(ext => `'${ext}'`)
            .join(', ');
          return `The file extension '${err.actualFileExtension}' is forbidden. Allowed extensions are: ${allowedFileExtensions}`;
        }
      },
      {
        name: 'filesize', message: (err: FilesizeError) => {
          return `The file is too big. Max filesize: ${this.fileSizePipe.transform(err.maxFilesize)}`;
        }
      },
      {
        name: 'filenameForbiddenCharacters', message: (err: FilenameForbiddenCharactersError) => {
          const actualForbiddenCharacters = err.actualForbiddenCharacters
          .map(char => `'${char}'`)
          .join(', ');
          return `The filename contains forbidden characters: ${actualForbiddenCharacters}`;
        }
      },
      {
        name: 'minFiles', message: (err: MinFilesError) => {
          return `Select at minimum ${err.minFiles} files`;
        }
      },
      {
        name: 'maxFiles', message: (err: MaxFilesError) => {
          return `Select at maximum ${err.maxFiles} files`;
        }
      },
      {
        name: 'totalFilesize', message: (err: TotalFilesizeError) => {
          return `The files are too big. Max total filesize: ${this.fileSizePipe.transform(err.maxTotalFilesize)}`;
        }
      },
      {
        name: 'uploadError', message: () => {
          return 'The file could not be uploaded';
        }
      },
    ];
  }

}
