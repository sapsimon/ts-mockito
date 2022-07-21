import { BehaviorSubject } from 'rxjs';

export class ProviderOne {
  observable$: BehaviorSubject<string> = new BehaviorSubject(
    'realproviderOneObservableValue'
  );
}
