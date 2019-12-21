# NgxFormlyMaterialFile

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Installation

### Install NPM Dependencies
Follow the quick-start for [ngx-formly](https://github.com/ngx-formly/ngx-formly#quick-start) using `@ngx-formly/material` as the UI library. Finally run `npm i ngx-formly-material-file`.

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
