import { FormControl } from '@angular/forms';
import { SelectedFile } from '../file-input/selected-file';
import { TotalFilesizeError } from './total-filesize-error';
import { TotalFilesizeValidator } from './total-filesize-validator';

describe('TotalFilesizeValidator', () => {

  const MAX_TOTAL_FILESIZE = 3;

  let validator: TotalFilesizeValidator;

  beforeEach(() => validator = new TotalFilesizeValidator(MAX_TOTAL_FILESIZE));

  it('should return null', () => {
    const blob: Blob = new Blob(['foo']);
    const selectedFile: SelectedFile = { file: new File([blob], '.txt') };
    const control = new FormControl([selectedFile]);
    expect(validator.validate(control)).toBeNull();
  });

  it('should return TotalFilesizeError if files are too big', () => {
    const blob: Blob = new Blob(['foo']);
    const selectedFile: SelectedFile = { file: new File([blob], '.txt') };
    const control = new FormControl([selectedFile, selectedFile]);
    const error: TotalFilesizeError = {
      maxTotalFilesize: MAX_TOTAL_FILESIZE,
      actualTotalFilesize: blob.size + blob.size
    };
    expect(validator.validate(control)).toEqual({ totalFilesize: error });
  });

});
