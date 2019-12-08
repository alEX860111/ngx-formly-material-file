import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MatTooltipModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormlyModule } from '@ngx-formly/core';
import { of } from 'rxjs';
import { FileSizePipe } from '../file-size/file-size.pipe';
import { FILE_TYPE_CONFIG } from '../file-type-config';
import { FileUploadState } from './file-upload-state';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadService } from './file-upload.service';
import { SelectedFile } from '../file-input/selected-file';

describe('FileUploadComponent', () => {

  let fileUploadService: jasmine.SpyObj<FileUploadService>;

  let component: FileUploadComponent;

  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async(() => {
    fileUploadService = jasmine.createSpyObj('fileUploadService', ['upload']);
    TestBed.configureTestingModule({
      imports: [FormlyModule, MatIconModule, MatButtonModule, MatProgressBarModule, MatTooltipModule, MatListModule],
      declarations: [FileUploadComponent, FileSizePipe],
      providers: [
        { provide: FILE_TYPE_CONFIG, useValue: {} }
      ]
    }).overrideProvider(FileUploadService, { useValue: fileUploadService })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    component.field = {};
    const selectedFile: SelectedFile = { file: new File(['foo'], 'foo.txt') };
    component.field.formControl = new FormControl(selectedFile);
    component.uploadUrl = '/upload';
  });

  it('should set formControl invalid if upload is in progress', () => {
    const fileUploadState: FileUploadState = {
      progress: 42
    };
    fileUploadService.upload.and.returnValue(of(fileUploadState));
    expect(component.progress).toEqual(0);

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.progress).toEqual(fileUploadState.progress);
    expect(component.field.formControl.valid).toBe(false);
    expect(component.field.formControl.value.location).not.toBeDefined();
  });

  it('sshould set formControl valid if upload is complete', () => {
    const fileUploadState: FileUploadState = {
      progress: 100,
      location: '/upload/1'
    };
    fileUploadService.upload.and.returnValue(of(fileUploadState));
    expect(component.progress).toEqual(0);

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.progress).toEqual(fileUploadState.progress);
    expect(component.field.formControl.valid).toBe(true);
    expect(component.field.formControl.value.location).toEqual('/upload/1');
  });

});
