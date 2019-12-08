import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, of, Subscription } from 'rxjs';
import { FileTypeConfig, FILE_TYPE_CONFIG } from '../file-type-config';
import { FileUploadService } from './file-upload.service';
import { SelectedFile } from '../file-input/selected-file';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [FileUploadService]
})
export class FileUploadComponent implements OnInit, OnDestroy {

  @Input()
  field: FormlyFieldConfig;

  @Input()
  uploadUrl: string;

  @Output()
  deleteFile = new EventEmitter<any>();

  progress = 0;

  uploadError: string;

  file: File;

  fileIcon: string;

  private progessSubscription: Subscription;

  constructor(
    @Inject(FILE_TYPE_CONFIG) public readonly fileTypeConfig: FileTypeConfig,
    private readonly uploadService: FileUploadService) { }

  ngOnInit() {
    this.fileIcon = this.uploadUrl ? 'fileType:fileUpload' : 'fileType:file';

    const selectedFile: SelectedFile = this.field.formControl.value;
    this.file = selectedFile.file;

    if (!this.field.formControl.valid || !this.uploadUrl) {
      return;
    }

    this.field.formControl.setAsyncValidators(this.validateUpload.bind(this));

    setTimeout(() => this.field.formControl.updateValueAndValidity(), 0);

    this.progessSubscription = this.uploadService.upload(this.file, this.uploadUrl)
      .subscribe(
        uploadState => {
          this.progress = uploadState.progress;
          if (this.progress === 100) {
            this.field.formControl.value.location = uploadState.location;
          }
        },
        error => {
          this.uploadError = error;
          this.field.formControl.updateValueAndValidity();
        },
        () => {
          this.field.formControl.updateValueAndValidity();
          if (this.progress === 100 && !this.uploadError) {
            this.fileIcon = 'fileType:file';
          }
        });
  }

  private validateUpload(): Observable<ValidationErrors | null> {
    if (this.uploadError) {
      return of({ uploadError: true });
    }

    if (this.progress === 100) {
      return of(null);
    }

    return of({ uploadInProgress: true });
  }

  ngOnDestroy() {
    this.cancelUpload();
  }

  removeFile() {
    this.cancelUpload();
    this.deleteFile.emit();
  }

  get showProgressBar(): boolean {
    return this.progessSubscription && !this.uploadError;
  }

  private cancelUpload() {
    if (this.progessSubscription) {
      this.progessSubscription.unsubscribe();
    }
  }

}
