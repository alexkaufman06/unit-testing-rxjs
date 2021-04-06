import { hot, cold } from 'jasmine-marbles';
import { concat } from 'rxjs/operators';

describe('concat', () => {
  it('should concat cold  2 observables', () => {
    const $obs1 = cold('---a---b|');
    const sub1 =               '^-------!';
    const $obs2 = cold('---c---d|');
    const sub2 =               '--------^-------!'
    const $result = $obs1.pipe(concat($obs2));
    const $expected = cold('---a---b---c---d|');

    expect($result).toBeObservable($expected);
    expect($obs1).toHaveSubscriptions(sub1);
    expect($obs2).toHaveSubscriptions(sub2);
  });

  xit('serving pizza to customer', () => {
    const status = {
      orderCreated: 'Order placed',
      paymentReceived: '$ received',
      orderReady: 'Pizza is ready',
      orderShipped: 'Pizza is on the way!!!'
    }
    const $orderCreated = cold('--c--|', { c: status.orderCreated });
    const $paymentReceived = cold('---p|', { c: status.paymentReceived });
    const $orderReady = cold('-r-|', { c: status.orderReady });
    const $orderShipped = cold('---s--|', { c: status.orderShipped });
    const $result = servePizza(
        $orderCreated,
        $paymentReceived,
        $orderReady,
        $orderShipped
    );
    const $expected = cold('--c-----p-r----s--|', {
      c: status.orderCreated,
      p: status.paymentReceived,
      r: status.orderReady,
      s: status.orderShipped
    });

    expect($result).toBeObservable($expected);
  });
});

function servePizza($sale, $payment, $kitchen, $shipOrReadyForPickup) {
  return $sale.pipe(concat($payment, $kitchen, $shipOrReadyForPickup));
}
