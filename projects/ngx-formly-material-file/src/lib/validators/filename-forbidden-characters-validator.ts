import { AbstractControl, ValidationErrors } from '@angular/forms';
import { SelectedFile } from '../file-input/selected-file';
import { FilenameForbiddenCharactersError } from './filename-forbidden-characters-error';

export class FilenameForbiddenCharactersValidator {

  constructor(private readonly forbiddenCharacters: string) { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedFile: SelectedFile = control.value;
    const file: File = selectedFile.file;

    const index = file.name.lastIndexOf('.');

    if (index === -1) {
      const error: FilenameForbiddenCharactersError = {
        forbiddenCharacters: this.forbiddenCharacters,
        actualForbiddenCharacters: undefined
      };
      return { filenameForbiddenCharacters: error };
    }

    const filename = file.name.substring(0, index);
    const actualForbiddenCharacters = new Array<string>();

    this.forbiddenCharacters.split('').forEach(forbiddenCharacter => {
      if (filename.includes(forbiddenCharacter)) {
        actualForbiddenCharacters.push(forbiddenCharacter);
      }
    });

    if (actualForbiddenCharacters.length !== 0) {
      const error: FilenameForbiddenCharactersError = {
        forbiddenCharacters: this.forbiddenCharacters,
        actualForbiddenCharacters: actualForbiddenCharacters.join('')
      };
      return { filenameForbiddenCharacters: error };
    }

    return null;
  }

}
