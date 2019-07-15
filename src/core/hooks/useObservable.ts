import { Observable } from 'rxjs';
import { useState, useEffect, useMemo } from 'react';

export type ObservableFactory<T> = () => Observable<T>;

export function useObservable<T>(observableFactory: ObservableFactory<T>, initialState: T, deps: Array<any> = []): T {
  const observable$ = useMemo<Observable<T>>(observableFactory, deps);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const subscription = observable$.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [observable$]);

  return state;
}