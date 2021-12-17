import { FormControl } from '@angular/forms';
import { FilesizeError } from './filesize-error';
import { FilesizeValidator } from './filesize-validator';
import { SelectedFile } from '../file-input/selected-file';

describe('FilesizeValidator', () => {

  const MAX_TOTAL_FILESIZE = 1;

  let validator: FilesizeValidator;

  beforeEach(() => validator = new FilesizeValidator(MAX_TOTAL_FILESIZE));

  it('should return null', () => {
    const selectedFile: SelectedFile = { file: new File([], '.txt') };
    const control = new FormControl(selectedFile);
    expect(validator.validate(control)).toBeNull();
  });

  it('should return FilesizeError if file is too big', () => {
    const blob: Blob = new Blob(['foo']);
    const selectedFile: SelectedFile = { file: new File([blob], '.txt') };
    const control = new FormControl(selectedFile);
    const error: FilesizeError = {
      maxFilesize: MAX_TOTAL_FILESIZE,
      actualFilesize: blob.size
    };
    expect(validator.validate(control)).toEqual({ filesize: error });
  });

});
