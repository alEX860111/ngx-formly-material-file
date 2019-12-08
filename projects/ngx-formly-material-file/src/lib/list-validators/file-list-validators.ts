import { ValidatorFn } from '@angular/forms';
import { MaxFilesValidator } from './max-files-validator';
import { MinFilesValidator } from './min-files-validator';
import { TotalFilesizeValidator } from './total-filesize-validator';

export class FileListValidators {

  static totalFilesize(maxTotalFilesize: number): ValidatorFn {
    const validator = new TotalFilesizeValidator(maxTotalFilesize);
    return validator.validate.bind(validator);
  }

  static minFiles(minFiles: number): ValidatorFn {
    const validator = new MinFilesValidator(minFiles);
    return validator.validate.bind(validator);
  }

  static maxFiles(maxFiles: number): ValidatorFn {
    const validator = new MaxFilesValidator(maxFiles);
    return validator.validate.bind(validator);
  }

}
