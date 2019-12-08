import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { FileUploadState } from './file-upload-state';

@Injectable()
export class FileUploadService {

  constructor(private readonly http: HttpClient) { }

  public upload(file: File, url: string): Observable<FileUploadState> {
    const request: HttpRequest<FormData> = this.createRequest(file, url);

    return this.http.request(request).pipe(
      filter(this.isSupportedEvent),
      map(this.createFileUploadState),
      catchError((error: HttpErrorResponse) => {
        throw error.statusText;
      })
    );
  }

  private createRequest(file: File, url: string): HttpRequest<FormData> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return new HttpRequest('POST', url, formData, {
      reportProgress: true
    });
  }

  private isSupportedEvent(event: HttpEvent<unknown>): boolean {
    return event.type === HttpEventType.UploadProgress || event.type === HttpEventType.Response;
  }

  private createFileUploadState(event: HttpEvent<unknown>): FileUploadState {
    if (event.type === HttpEventType.UploadProgress) {
      const percentDone = Math.round(100 * event.loaded / event.total);
      return { progress: percentDone };
    }

    if (event.type === HttpEventType.Response) {
      if (event.ok) {
        return { progress: 100, location: event.headers.get('Location') };
      } else {
        throw event.statusText;
      }
    }

    throw 'upload error';
  }

}
