import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { SelectedFile } from '../file-input/selected-file';

@Component({
  selector: 'app-file-type',
  templateUrl: './file-type.component.html',
  styleUrls: ['./file-type.component.scss']
})
export class FileTypeComponent extends FieldArrayType {

  onSelectFiles(files: SelectedFile[]) {
    this.field.formControl.markAsTouched();
    files.forEach(file => {
      this.add(this.formControl.length, file);
    });
  }

  onDeleteFile(index: number) {
    this.remove(index);
  }

}
