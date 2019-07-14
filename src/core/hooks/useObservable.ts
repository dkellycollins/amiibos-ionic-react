import { Observable } from 'rxjs';
import { useState, useEffect } from 'react';

export function useObservable<T>(observable$: Observable<T>, initialState: T): T {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const subscription = observable$.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [observable$]);

  return state;
}