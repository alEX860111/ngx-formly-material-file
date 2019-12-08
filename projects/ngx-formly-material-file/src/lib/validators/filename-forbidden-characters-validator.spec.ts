import { FormControl } from '@angular/forms';
import { SelectedFile } from '../file-input/selected-file';
import { FilenameForbiddenCharactersError } from './filename-forbidden-characters-error';
import { FilenameForbiddenCharactersValidator } from './filename-forbidden-characters-validator';

describe('FilenameForbiddenCharactersValidator', () => {

  const FORBIDDEN_CHARACTERS = 'xy';

  let validator: FilenameForbiddenCharactersValidator;

  beforeEach(() => validator = new FilenameForbiddenCharactersValidator(FORBIDDEN_CHARACTERS));

  it('should return null', () => {
    const selectedFile: SelectedFile = { file: new File([], 'abc.txt') };
    const control = new FormControl(selectedFile);
    expect(validator.validate(control)).toBeNull();
  });

  it('should return FilenameForbiddenCharactersError if filename cannot be determined', () => {
    const blob: Blob = new Blob(['foo']);
    const selectedFile: SelectedFile = { file: new File([blob], 'txt') };
    const control = new FormControl(selectedFile);
    const error: FilenameForbiddenCharactersError = {
      forbiddenCharacters: FORBIDDEN_CHARACTERS,
      actualForbiddenCharacters: undefined
    };
    expect(validator.validate(control)).toEqual({ filenameForbiddenCharacters: error });
  });

  it('should return FilenameForbiddenCharactersError if filename contains a forbidden character', () => {
    const blob: Blob = new Blob(['foo']);
    const selectedFile: SelectedFile = { file: new File([blob], 'axbc.txt') };
    const control = new FormControl(selectedFile);
    const error: FilenameForbiddenCharactersError = {
      forbiddenCharacters: FORBIDDEN_CHARACTERS,
      actualForbiddenCharacters: 'x'
    };
    expect(validator.validate(control)).toEqual({ filenameForbiddenCharacters: error });
  });

  it('should return FilenameForbiddenCharactersError if filename contains forbidden characters', () => {
    const blob: Blob = new Blob(['foo']);
    const selectedFile: SelectedFile = { file: new File([blob], 'axbyc.txt') };
    const control = new FormControl(selectedFile);
    const error: FilenameForbiddenCharactersError = {
      forbiddenCharacters: FORBIDDEN_CHARACTERS,
      actualForbiddenCharacters: 'xy'
    };
    expect(validator.validate(control)).toEqual({ filenameForbiddenCharacters: error });
  });

});
