import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MaxFilenameLengthError } from './max-filename-length-error';
import { SelectedFile } from '../file-input/selected-file';

export class MaxFilenameLengthValidator {

  constructor(private readonly maxFilenameLength: number) { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedFile: SelectedFile = control.value;
    const file: File = selectedFile.file;

    const index = file.name.lastIndexOf('.');

    if (index === -1) {
      const error: MaxFilenameLengthError = {
        maxFilenameLength: this.maxFilenameLength,
        acturalFilenameLength: undefined
      };
      return { maxFilenameLength: error };
    }

    const filename = file.name.substring(0, index);

    if (filename.length > this.maxFilenameLength) {
      const error: MaxFilenameLengthError = {
        maxFilenameLength: this.maxFilenameLength,
        acturalFilenameLength: filename.length
      };
      return { maxFilenameLength: error };
    }

    return null;
  }

}
