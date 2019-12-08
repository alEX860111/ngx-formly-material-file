import { FormControl } from '@angular/forms';
import { MaxFilenameLengthError } from './max-filename-length-error';
import { MaxFilenameLengthValidator } from './max-filename-length-validator';
import { SelectedFile } from '../file-input/selected-file';

describe('MaxFilenameLengthValidator', () => {

  const MAX_FILENAME_LENGTH = 5;

  let validator: MaxFilenameLengthValidator;

  beforeEach(() => {
    validator = new MaxFilenameLengthValidator(MAX_FILENAME_LENGTH);
  });

  it('should return null', () => {
    const selectedFile: SelectedFile = { file: new File([], '12345.txt') };
    const control = new FormControl(selectedFile);
    expect(validator.validate(control)).toBeNull();
  });

  it('should return null if filename is blank', () => {
    const selectedFile: SelectedFile = { file: new File([], '.txt') };
    const control = new FormControl(selectedFile);
    expect(validator.validate(control)).toBeNull();
  });

  it('should return MaxFilenameLengthError if filename is to long', () => {
    const selectedFile: SelectedFile = { file: new File([], '123456.txt') };
    const control = new FormControl(selectedFile);
    const error: MaxFilenameLengthError = {
      maxFilenameLength: MAX_FILENAME_LENGTH,
      acturalFilenameLength: 6
    };
    expect(validator.validate(control)).toEqual({ maxFilenameLength: error });
  });

  it('should return MaxFilenameLengthError if filename cannot be determined', () => {
    const selectedFile: SelectedFile = { file: new File([], '123456') };
    const control = new FormControl(selectedFile);
    const error: MaxFilenameLengthError = {
      maxFilenameLength: MAX_FILENAME_LENGTH,
      acturalFilenameLength: undefined
    };
    expect(validator.validate(control)).toEqual({ maxFilenameLength: error });
  });

});
