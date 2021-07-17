import { AbstractControl, ValidationErrors } from '@angular/forms';
import { SelectedFile } from '../file-input/selected-file';
import { MaxFilesError } from './max-files-error';

export class MaxFilesValidator {

  constructor(private readonly maxFiles: number) { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedFiles: SelectedFile[] = control.value;

    if (selectedFiles.length > this.maxFiles) {
      const error: MaxFilesError = {
        maxFiles: this.maxFiles,
        actualFiles: selectedFiles.length
      };
      return { maxFiles: error };
    }

    return null;
  }

}
