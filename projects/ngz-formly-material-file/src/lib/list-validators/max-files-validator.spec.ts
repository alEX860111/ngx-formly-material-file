import { FormControl } from '@angular/forms';
import { SelectedFile } from '../file-input/selected-file';
import { MaxFilesError } from './max-files-error';
import { MaxFilesValidator } from './max-files-validator';

describe('MaxFilesValidator', () => {

  const MAX_FILES = 1;

  let validator: MaxFilesValidator;

  beforeEach(() => validator = new MaxFilesValidator(MAX_FILES));

  it('should return null', () => {
    const selectedFile: SelectedFile = { file: new File([], '.txt') };
    const control = new FormControl([selectedFile]);
    expect(validator.validate(control)).toBeNull();
  });

  it('should return MaxFilesError if control has to many files', () => {
    const selectedFile: SelectedFile = { file: new File([], '.txt') };
    const control = new FormControl([selectedFile, selectedFile]);
    const error: MaxFilesError = {
      maxFiles: MAX_FILES,
      actualFiles: 2
    };
    expect(validator.validate(control)).toEqual({ maxFiles: error });
  });

});
