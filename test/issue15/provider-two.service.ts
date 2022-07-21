import { BehaviorSubject } from 'rxjs';

export class ProviderTwo {
  observable$: BehaviorSubject<string> = new BehaviorSubject(
    'realproviderTwoObservableValue'
  );
}
