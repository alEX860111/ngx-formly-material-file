import { FileSizePipe } from './file-size.pipe';

describe('FileSizePipe', () => {

  let pipe: FileSizePipe;

  beforeEach(() => {
    pipe = new FileSizePipe('en-US');
  });

  it('should transform bytes', () => {
    expect(pipe.transform(300)).toEqual('300 B');
    expect(pipe.transform(1 * 1000)).toEqual('1 kB');
    expect(pipe.transform(10 * 1000)).toEqual('10 kB');
    expect(pipe.transform(100 * 1000)).toEqual('100 kB');
    expect(pipe.transform(342 * 1000)).toEqual('342 kB');
    expect(pipe.transform(1000 * 1000)).toEqual('1 MB');
    expect(pipe.transform(1234 * 1000)).toEqual('1.2 MB');
    expect(pipe.transform(1274 * 1000)).toEqual('1.3 MB');
    expect(pipe.transform(20 * 1000 * 1000)).toEqual('20 MB');
    expect(pipe.transform(100 * 1000 * 1000)).toEqual('100 MB');
    expect(pipe.transform(1000 * 1000 * 1000)).toEqual('1 GB');
  });

});
