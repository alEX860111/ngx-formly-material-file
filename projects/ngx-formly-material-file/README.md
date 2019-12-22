# NgxFormlyMaterialFile

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Installation

### Install NPM Dependencies
Follow the quick-start for [ngx-formly](https://github.com/ngx-formly/ngx-formly#quick-start) and use `@ngx-formly/material` as the UI library. Finally run `npm i ngx-formly-material-file`.
### Icons
`ngx-formly-material-file` uses [material icons](https://material.io/resources/icons/?style=baseline) as a default. Add the following entry to the `assets` array in your `angular.json` to serve the icons:
```json
{ 
   "glob":"**/*",
   "input":"./node_modules/ngx-formly-material-file/assets/svgs",
   "output":"/assets/svgs/"
}
```
### Configure the App Module
```typescript
...
import { LOCALE_ID, NgModule } from '@angular/core';
import { FileTypeComponent, FileTypeModule, FileTypeValidationMessages } from 'ngx-formly-material-file';
...

export const APP_LOCALE_ID = 'en-US';

@NgModule({
  imports: [
    ...
    FileTypeModule.forRoot({}),
    FormlyModule.forRoot({
      validationMessages: new FileTypeValidationMessages(APP_LOCALE_ID).validationMessages,
      types: [
        { name: 'file', component: FileTypeComponent },
      ],
    })
    ...
  ],
  ...
  providers: [{ provide: LOCALE_ID, useValue: APP_LOCALE_ID }, ...],
})
export class AppModule {}
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
## Customization
### Icons
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
### Validation messages
```typescript
...
import { LOCALE_ID, NgModule } from '@angular/core';
import { FileTypeComponent, FileTypeModule, FileTypeValidationMessages } from 'ngx-formly-material-file';
...

export const APP_LOCALE_ID = 'en-US';

@NgModule({
  imports: [
    ...
    FileTypeModule.forRoot({}),
    FormlyModule.forRoot({
      validationMessages: new FileTypeValidationMessages(APP_LOCALE_ID).validationMessages.concat([
        { name: 'maxFilenameLength', message: 'my custom message' },
        { name: 'minFilenameLength', message: 'my custom message' },
        { name: 'fileExtension', message: 'my custom message' },
        { name: 'filesize', message: '2do' },
        { name: 'filenameForbiddenCharacters', message: 'my custom message' },
        { name: 'minFiles', message: 'my custom message' },
        { name: 'maxFiles', message: '2do' },
        { name: 'totalFilesize', message: 'my custom message' },
        { name: 'uploadError', message: 'my custom message' }
      ]),
      types: [
        { name: 'file', component: FileTypeComponent },
      ],
    })
    ...
  ],
  ...
  providers: [{ provide: LOCALE_ID, useValue: APP_LOCALE_ID }, ...],
})
export class AppModule {}
```
