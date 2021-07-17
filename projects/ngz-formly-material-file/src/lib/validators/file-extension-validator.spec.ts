import { FormControl } from '@angular/forms';
import { FileExtensionValidator } from './file-extension-validator';
import { FileExtensionError } from './file-extension-error';
import { SelectedFile } from '../file-input/selected-file';

describe('FileExtensionValidator', () => {

  const ALLOWED_FILE_EXTENSIONS = ['pdf', 'txt'];

  let validator: FileExtensionValidator;

  beforeEach(() => validator = new FileExtensionValidator(ALLOWED_FILE_EXTENSIONS));

  it('should return null', () => {
    const selectedFile: SelectedFile = { file: new File([], '.txt') };
    const control = new FormControl(selectedFile);
    expect(validator.validate(control)).toBeNull();
  });

  it('should return null if file extension is uppercase', () => {
    const selectedFile: SelectedFile = { file: new File([], '.TXT') };
    const control = new FormControl(selectedFile);
    expect(validator.validate(control)).toBeNull();
  });

  it('should return FileExtensionError if extension is not allowed', () => {
    const selectedFile: SelectedFile = { file: new File([], '.png') };
    const control = new FormControl(selectedFile);
    const error: FileExtensionError = {
      allowedFileExtensions: ALLOWED_FILE_EXTENSIONS,
      actualFileExtension: 'png'
    };
    expect(validator.validate(control)).toEqual({ fileExtension: error });
  });

  it('should return FileExtensionError if extension cannot be determined', () => {
    const selectedFile: SelectedFile = { file: new File([], 'foo') };
    const control = new FormControl(selectedFile);
    const error: FileExtensionError = {
      allowedFileExtensions: ALLOWED_FILE_EXTENSIONS,
      actualFileExtension: undefined
    };
    expect(validator.validate(control)).toEqual({ fileExtension: error });
  });

});
