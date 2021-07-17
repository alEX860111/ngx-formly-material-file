import { FormControl } from '@angular/forms';
import { SelectedFile } from '../file-input/selected-file';
import { MinFilesError } from './min-files-error';
import { MinFilesValidator } from './min-files-validator';

describe('MinFilesValidator', () => {

  const MIN_FILES = 1;

  let validator: MinFilesValidator;

  beforeEach(() => validator = new MinFilesValidator(MIN_FILES));

  it('should return null', () => {
    const selectedFile: SelectedFile = { file: new File([], '.txt') };
    const control = new FormControl([selectedFile]);
    expect(validator.validate(control)).toBeNull();
  });

  it('should return MinFilesError if control has to few files', () => {
    const control = new FormControl([]);
    const error: MinFilesError = {
      minFiles: MIN_FILES,
      actualFiles: 0
    };
    expect(validator.validate(control)).toEqual({ minFiles: error });
  });

});
