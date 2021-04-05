import { hot, cold } from 'jasmine-marbles';
import { switchMap } from 'rxjs/operators';

describe('hot', () => {

  it('should test subscription on hot observable', () => {
    const provided = hot('-a-^b---c-|');
    const subscription = '^------!';
    expect(provided).toBeObservable(cold('-b---c-|'));
    expect(provided).toHaveSubscriptions(subscription);
  });

  it('should test subscription on hot observable that never completes', () => {
    const provided = hot('-a-^(bc)--');
    expect(provided).toBeObservable(cold('-(bc)--'));
    const subscription = '^--';
    expect(provided).toHaveSubscriptions(subscription);
  });

  it('can convert alphabet to uppercase', () => {
    const alphabet = hot('--a--b--c--d--');
    const provided = convertToUppercase(alphabet);
    expect(provided).toBeObservable(cold('--A--B--C--D--'));
    const subscription = '^--'; // two dashes are sufficient here to remove unnecessary verbosity
    expect(alphabet).toHaveSubscriptions(subscription);
  });
});

function convertToUppercase($letters) {
  return $letters.pipe(switchMap((s: string): any => s.toUpperCase()));
}
