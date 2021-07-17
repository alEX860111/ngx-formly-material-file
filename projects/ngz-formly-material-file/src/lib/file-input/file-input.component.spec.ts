import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon, MatIconModule } from '@angular/material';
import { FileTypeModule } from '../file-type.module';
import { FileInputComponent } from './file-input.component';
import { SelectedFile } from './selected-file';

@Component({
  selector: 'mat-icon',
  template: '<span></span>'
})
class MockMatIconComponent {
  @Input() svgIcon: any;
}

describe('FileInputComponent', () => {

  let component: FileInputComponent;

  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(() => {
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
    });
    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a selectFiles event', (done) => {
    const files: File[] = [new File([], '.txt')];
    const fileList = jasmine.createSpyObj('fileList', ['item']);
    fileList.length = files.length;
    fileList.item.and.returnValue(files[0]);

    const event = { target: { files: fileList } };
    component.selectFiles.subscribe(selectedFiles => {
      const expectedSelectedFiles: SelectedFile[] = [{
        file: files[0]
      }];
      expect(selectedFiles).toEqual(expectedSelectedFiles);
      done();
    });
    component.onChange(event);
  });

});
