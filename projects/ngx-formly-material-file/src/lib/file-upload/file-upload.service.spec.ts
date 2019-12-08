import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FileUploadService } from './file-upload.service';
import { FileUploadState } from './file-upload-state';

describe('FileUploadService', () => {

  const URL = '/upload';

  const LOCATION = URL + '/1'

  let service: FileUploadService;

  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileUploadService]
    });

    service = TestBed.get(FileUploadService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should upload file to url', done => {
    const file: File = new File(['hello world'], 'foo.txt');

    let state: FileUploadState;

    service.upload(file, URL).subscribe(stateResult => {
      state = stateResult;
    }, fail, () => {
      const expectedState: FileUploadState = {
        progress: 100,
        location: LOCATION
      };
      expect(state).toEqual(expectedState);
      done();
    });

    const req = httpTestingController.expectOne(URL);

    expect(req.request.method).toEqual('POST');

    req.flush('', { headers: new HttpHeaders({ Location: LOCATION }) });
  });

  it('should handle error', done => {
    const file: File = new File(['hello world'], 'foo.txt');

    let state: FileUploadState;

    service.upload(file, URL).subscribe(stateResult => {
      state = stateResult;
    }, error => {
      expect(error).toEqual('Internal Server Error');
      expect(state).toBeUndefined();
      done();
    }, fail);

    const req = httpTestingController.expectOne(URL);

    expect(req.request.method).toEqual('POST');

    req.flush('', { status: 500, statusText: 'Internal Server Error' });
  });

});
