import { ValidatorFn } from '@angular/forms';
import { FileExtensionValidator } from './file-extension-validator';
import { FilenameForbiddenCharactersValidator } from './filename-forbidden-characters-validator';
import { FilesizeValidator } from './filesize-validator';
import { MaxFilenameLengthValidator } from './max-filename-length-validator';
import { MinFilenameLengthValidator } from './min-filename-length-validator';

export class FileValidators {

  static maxFilenameLength(maxFilenameLength: number): ValidatorFn {
    const validator = new MaxFilenameLengthValidator(maxFilenameLength);
    return validator.validate.bind(validator);
  }

  static minFilenameLength(minFilenameLength: number): ValidatorFn {
    const validator = new MinFilenameLengthValidator(minFilenameLength);
    return validator.validate.bind(validator);
  }

  static fileExtension(allowedFileExtensions: string[]): ValidatorFn {
    const validator = new FileExtensionValidator(allowedFileExtensions);
    return validator.validate.bind(validator);
  }

  static filesize(maxFilesize: number): ValidatorFn {
    const validator = new FilesizeValidator(maxFilesize);
    return validator.validate.bind(validator);
  }

  static filenameForbiddenCharacters(forbiddenCharacters: string): ValidatorFn {
    const validator = new FilenameForbiddenCharactersValidator(forbiddenCharacters);
    return validator.validate.bind(validator);
  }

}
