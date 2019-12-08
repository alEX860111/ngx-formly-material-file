import { FormControl } from '@angular/forms';
import { SelectedFile } from '../file-input/selected-file';
import { MinFilenameLengthError } from './min-filename-length-error';
import { MinFilenameLengthValidator } from './min-filename-length-validator';

describe('MinFilenameLengthValidator', () => {

  const MIN_FILENAME_LENGTH = 5;

  let validator: MinFilenameLengthValidator;

  beforeEach(() => {
    validator = new MinFilenameLengthValidator(MIN_FILENAME_LENGTH);
  });

  it('should return null', () => {
    const selectedFile: SelectedFile = { file: new File([], '12345.txt') };
    const control = new FormControl(selectedFile);
    expect(validator.validate(control)).toBeNull();
  });

  it('should return MinFilenameLengthError if filename is to short', () => {
    const selectedFile: SelectedFile = { file: new File([], '1.txt') };
    const control = new FormControl(selectedFile);
    const error: MinFilenameLengthError = {
      minFilenameLength: MIN_FILENAME_LENGTH,
      acturalFilenameLength: 1
    };
    expect(validator.validate(control)).toEqual({ minFilenameLength: error });
  });

  it('should return MinFilenameLengthError if filename is blank', () => {
    const selectedFile: SelectedFile = { file: new File([], '.txt') };
    const control = new FormControl(selectedFile);
    const error: MinFilenameLengthError = {
      minFilenameLength: MIN_FILENAME_LENGTH,
      acturalFilenameLength: 0
    };
    expect(validator.validate(control)).toEqual({ minFilenameLength: error });
  });

  it('should return MinFilenameLengthError if filename cannot be determined', () => {
    const selectedFile: SelectedFile = { file: new File([], '123456') };
    const control = new FormControl(selectedFile);
    const error: MinFilenameLengthError = {
      minFilenameLength: MIN_FILENAME_LENGTH,
      acturalFilenameLength: undefined
    };
    expect(validator.validate(control)).toEqual({ minFilenameLength: error });
  });

});
