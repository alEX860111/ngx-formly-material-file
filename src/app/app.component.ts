import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FileListValidators, FileValidators } from 'ngz-formly-material-file';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  form = new FormGroup({});

  model: any = {};

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Placeholder',
        description: 'Enter your name',
        required: true
      }
    },
    {
      key: 'pictures',
      type: 'file',
      templateOptions: {
        label: 'Pictures',
        description: 'Upload some nice pictures',
        required: true,
        uploadUrl: '/upload'
      },
      validators: {
        validation: [
          FileListValidators.minFiles(2),
          FileListValidators.maxFiles(4),
          FileListValidators.totalFilesize(400 * 1000)
        ]
      },
      fieldArray: {
        validators: {
          validation: [
            FileValidators.minFilenameLength(1),
            FileValidators.maxFilenameLength(50),
            FileValidators.fileExtension(['pdf', 'txt', 'png']),
            FileValidators.filesize(1000 * 1000),
            FileValidators.filenameForbiddenCharacters(['/'])
          ]
        }
      }
    },
  ];

}
