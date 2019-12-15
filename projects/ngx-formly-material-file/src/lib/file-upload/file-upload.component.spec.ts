import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material';
import { of } from 'rxjs';
import { SelectedFile } from '../file-input/selected-file';
import { FileTypeModule } from '../file-type.module';
import { FileUploadState } from './file-upload-state';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'mat-icon',
  template: '<span></span>'
})
class MockMatIconComponent {
  @Input() svgIcon: any;
}

describe('FileUploadComponent', () => {

  let fileUploadService: jasmine.SpyObj<FileUploadService>;

  let component: FileUploadComponent;

  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async(() => {
    fileUploadService = jasmine.createSpyObj('fileUploadService', ['upload']);
    TestBed.configureTestingModule({
      imports: [FileTypeModule.forRoot({})]
    }).overrideModule(MatIconModule, {
      remove: {
        declarations: [MatIcon],
        exports: [MatIcon]
      },
      add: {
        declarations: [MockMatIconComponent],
        exports: [MockMatIconComponent]
      }
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
