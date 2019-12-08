import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileInputComponent } from './file-input.component';
import { FILE_TYPE_CONFIG } from '../file-type-config';
import { SelectedFile } from './selected-file';

describe('FileInputComponent', () => {

  let component: FileInputComponent;

  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatButtonModule],
      declarations: [FileInputComponent],
      providers: [{ provide: FILE_TYPE_CONFIG, useValue: {} }]

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

    const event = { target: { files: fileList }};
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
