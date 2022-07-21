import { BehaviorSubject } from 'rxjs';
import {instance, mock, spy, when} from "../../lib/ts-mockito";
import { ProviderOne } from './provider-one.service';
import { ProviderTwo } from './provider-two.service';
import { BasicClass } from './basic.class';

describe('BasicClass', () => {
  let service: BasicClass;
  let serviceSpy: BasicClass;
  let providerOneMock: ProviderOne;
  let providerTwoMock: ProviderTwo;
  const providerOneObservable$ = new BehaviorSubject(
    'mockedProviderOneObservable'
  );
  const providerTwoObservable$ = new BehaviorSubject(
    'mockedProviderTwoObservable'
  );

  beforeEach(() => {
    providerOneMock = mock(ProviderOne);
    providerTwoMock = mock(ProviderTwo);

    when(providerOneMock.observable$).thenReturn(providerOneObservable$);
    when(providerTwoMock.observable$).thenReturn(providerTwoObservable$);

    service = new BasicClass(
      // providerOneMock,
      // providerTwoMock
      instance(providerOneMock),
      instance(providerTwoMock)
    );
    serviceSpy = spy(service);
    // console.log(serviceSpy);
    //
    // when(serviceSpy.methodOne(anything())).thenReturn({ foo: 'bar' });
  });

  describe('spying and mocking on service under test', () => {
    it('should return mocked value', () => {
      const expected = service.methodOne({
        some: 'value',
      });

      expect(expected).toEqual({ foo: 'bar' });
    });
  });

  describe('mocking combineLatest observables on service under test', () => {
    it('should not mock out rxjs combineLatest', () => {
      // Prove that combineLatest is not mocked

      const expected = `function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var resultSelector = undefined;
    var scheduler = undefined;
    if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
        scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
        resultSelector = observables.pop();
    }
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    return fromArray_1.fromArray(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
}`;

      expect(service.whatIsCombineLatest).toEqual(expected);
    });

    it('should mock out providers with combineLatest - subscribe',done => {
      // The providers have mock values set in beforeEach, so the combinedProviderObservable$
      // should return those values
      // console.log(service);
      service.combinedProviderObservable$.subscribe(value => {
        expect(value).toEqual(
          'mockedProviderOneObservable/mockedProviderTwoObservable'
        );
        done();
      });
    });

    it('should not mock for local observables in combineLatest - subscribe',done => {
      // Spying on the service under test should not replace the
      // observable$ and observableTwo$ class fields

      // See 'should not mock spied service observable - subscribe', which passes
      service.localCombinedObservable$.subscribe(value => {
        expect(value).toEqual('realObservableOne/realObservableTwo');
        done();
      });
    });
  });
});
