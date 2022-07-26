import { BasicClass } from './basic.class';

describe('BasicClass', () => {
  let service: BasicClass;

  beforeEach(() => {
    service = new BasicClass();
  });

  describe('mocking combineLatest observables on service under test', () => {

    it('should mock out providers with combineLatest - subscribe',done => {
      service.localCombinedObservable$.subscribe(value => {
        expect(value).toEqual(
          'realObservableOne/realObservableTwo'
        );
        done();
      });
    });
  });
});
