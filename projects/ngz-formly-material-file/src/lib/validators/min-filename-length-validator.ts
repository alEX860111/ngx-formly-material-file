import { AbstractControl, ValidationErrors } from '@angular/forms';
import { SelectedFile } from '../file-input/selected-file';
import { MinFilenameLengthError } from './min-filename-length-error';

export class MinFilenameLengthValidator {

  constructor(private readonly minFilenameLength: number) { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedFile: SelectedFile = control.value;
    const file: File = selectedFile.file;

    const index = file.name.lastIndexOf('.');

    if (index === -1) {
      const error: MinFilenameLengthError = {
        minFilenameLength: this.minFilenameLength,
        acturalFilenameLength: undefined
      };
      return { minFilenameLength: error };
    }

    const filename = file.name.substring(0, index);

    if (filename.length < this.minFilenameLength) {
      const error: MinFilenameLengthError = {
        minFilenameLength: this.minFilenameLength,
        acturalFilenameLength: filename.length
      };
      return { minFilenameLength: error };
    }

    return null;
  }

}
