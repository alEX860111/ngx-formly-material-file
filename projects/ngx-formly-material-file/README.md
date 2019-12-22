# NgxFormlyMaterialFile

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Installation

### Install NPM Dependencies
Follow the quick-start for [ngx-formly](https://github.com/ngx-formly/ngx-formly#quick-start) and use `@ngx-formly/material` as the UI library. Finally run `npm i ngx-formly-material-file`.

### Configure the App Module
```typescript
...
import { FileTypeComponent, FileTypeModule } from 'ngx-formly-material-file';
...

@NgModule({
  imports: [
    ...
    FileTypeModule.forRoot({}),
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'maxFilenameLength', message: '2do' },
        { name: 'minFilenameLength', message: '2do' },
        { name: 'fileExtension', message: '2do' },
        { name: 'filesize', message: '2do' },
        { name: 'filenameForbiddenCharacters', message: '2do' },
        { name: 'minFiles', message: '2do' },
        { name: 'maxFiles', message: '2do' },
        { name: 'totalFilesize', message: '2do' },
        { name: 'uploadError', message: '2do' }
      ],
      types: [
        { name: 'file', component: FileTypeComponent },
      ],
    })
    ...
  ],
  ...
})
export class AppModule {}
```
### Include the icons
`ngx-formly-material-file` uses [material icons](https://material.io/resources/icons/?style=baseline) as a default. Add the following entry to the `assets` array in your `angular.json` to serve the icons:
```json
{ 
   "glob":"**/*",
   "input":"./node_modules/ngx-formly-material-file/assets/svgs",
   "output":"/assets/svgs/"
}
```
### Using custom icons
You can replace the default [material icons](https://material.io/resources/icons/?style=baseline) by using the `MatIconRegistry`. Here is an example:
```typescript
...
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileDrop', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file-import.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'file', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileUpload', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/file-upload.svg'));
    matIconRegistry.addSvgIconInNamespace('fileType', 'fileRemove', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/solid/times.svg'));
  }
}
```
### Use FileTypeComponent
```typescript
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FileListValidators, FileValidators } from 'ngx-formly-material-file';

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
            FileValidators.filenameForbiddenCharacters('/')
          ]
        }
      }
    },
  ];

}

```
