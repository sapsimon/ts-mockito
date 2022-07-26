import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class BasicClass {
  observable$ = new BehaviorSubject('realObservableOne');
  observableTwo$ = new BehaviorSubject('realObservableTwo');

  localCombinedObservable$: Observable<string> = combineLatest([
    this.observable$,
    this.observableTwo$,
  ]).pipe(map(([second, third]) => `${second}/${third}`));

  constructor() {}
}
