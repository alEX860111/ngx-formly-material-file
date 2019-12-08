import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FileTypeConfig, FILE_TYPE_CONFIG } from '../file-type-config';
import { SelectedFile } from './selected-file';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  @ViewChild('fileInput', { static: true })
  fileInput: ElementRef;

  @ViewChild('dropzone', { static: true })
  dropzone: ElementRef;

  @Output()
  selectFiles = new EventEmitter<SelectedFile[]>();

  constructor(
    private readonly renderer: Renderer2,
    @Inject(FILE_TYPE_CONFIG) public readonly fileTypeConfig: FileTypeConfig) { }

  ngOnInit() {
    this.dropzone.nativeElement.addEventListener('dragenter', this.addDragoverClass.bind(this), false);
    this.dropzone.nativeElement.addEventListener('dragover', this.addDragoverClass.bind(this), false);
    this.dropzone.nativeElement.addEventListener('drop', this.onDrop.bind(this), false);
    this.dropzone.nativeElement.addEventListener('dragleave', this.removeDragoverClass.bind(this), false);
    this.dropzone.nativeElement.addEventListener('dragend', this.removeDragoverClass.bind(this), false);
  }

  private addDragoverClass(event: any) {
    event.dataTransfer.dropEffect = 'copy';
    event.stopPropagation();
    event.preventDefault();
    this.renderer.addClass(this.dropzone.nativeElement, 'is-dragover');
  }

  private removeDragoverClass(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.renderer.removeClass(this.dropzone.nativeElement, 'is-dragover');
  }

  private onDrop(event: any) {
    this.removeDragoverClass(event);
    const fileList: FileList = event.dataTransfer.files;
    this.handleFileList(fileList);
  }

  onBrowseFiles() {
    this.fileInput.nativeElement.value = null;
    this.fileInput.nativeElement.click();
  }

  onChange(event: any) {
    const fileList: FileList = event.target.files;
    this.handleFileList(fileList);
  }

  private handleFileList(fileList: FileList) {
    const files = this.convertFileList(fileList);
    this.selectFiles.emit(files);
  }

  private convertFileList(fileList: FileList): Array<SelectedFile> {
    const files = new Array<SelectedFile>();
    for (let i = 0; i < fileList.length; i++) {
      const file: File = fileList.item(i);
      files.push({ file });
    }
    return files;
  }

}
