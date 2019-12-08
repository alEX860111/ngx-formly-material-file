import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FilesizeError } from './filesize-error';
import { SelectedFile } from '../file-input/selected-file';

export class FilesizeValidator {

  constructor(private readonly maxFilesize: number) { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedFile: SelectedFile = control.value;
    const file: File = selectedFile.file;

    if (file.size > this.maxFilesize) {
      const error: FilesizeError = {
        maxFilesize: this.maxFilesize,
        actualFilesize: file.size
      };
      return { filesize: error };
    }

    return null;
  }

}
