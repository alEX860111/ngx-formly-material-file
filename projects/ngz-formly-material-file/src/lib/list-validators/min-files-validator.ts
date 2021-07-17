import { AbstractControl, ValidationErrors } from '@angular/forms';
import { SelectedFile } from '../file-input/selected-file';
import { MinFilesError } from './min-files-error';

export class MinFilesValidator {

  constructor(private readonly minFiles) { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedFiles: SelectedFile[] = control.value;

    if (selectedFiles.length < this.minFiles) {
      const error: MinFilesError = {
        minFiles: this.minFiles,
        actualFiles: selectedFiles.length
      };
      return { minFiles: error };
    }

    return null;
  }

}
