import { AbstractControl, ValidationErrors } from '@angular/forms';
import { SelectedFile } from '../file-input/selected-file';
import { TotalFilesizeError } from './total-filesize-error';

export class TotalFilesizeValidator {

  constructor(private readonly maxTotalFilesize: number) { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedFiles: SelectedFile[] = control.value;

    const actualTotalFilesize = selectedFiles
      .map(file => file.file.size)
      .reduce((size1, size2) => size1 + size2, 0);

    if (actualTotalFilesize > this.maxTotalFilesize) {
      const error: TotalFilesizeError = {
        maxTotalFilesize: this.maxTotalFilesize,
        actualTotalFilesize
      };
      return { totalFilesize: error };
    }

    return null;
  }

}
