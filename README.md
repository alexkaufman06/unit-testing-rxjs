# Unit Testing RxJS with Marble Diagrams
This repository serves as documentation on learnings from watching the PluralSight course on Unit Testing RxJS with Marble Diagrams.

## Getting Started
* Marble Testing allows us to write tests for asynchronous functionality in a synchronous and visual way
* Challenges with Observable testing
  * How to test Observables synchronously
  * How to make Observable stream predictable
  * Hot wo mock Observable emitted values
  * Answers: Marble testing
* RxJS: Reactive Extension for JavaScript. It is a library for reactive programming using observables that makes it
  easier to compose asynchronous code.
* Marble Testing: a technique where we draw marble diagrams using ASCII charaters while writing unit tests to visualize
  asynchronous Observables behavior in a synchronous way.
* An Observable is cold when data is produced inside the Observable and the Observable is hot when the data is produced 
  outside the Observable.
* Benefits of Marble Testing
  * Makes your test code readable
  * Allows you to write Asynchronous tests in a synchronous manner
  * Helps you find race conditions in your code
 
## Learning Jasmine Marble Basics
* Timelines in RxJS:
  * Time flows from left to right
  * Top line is source observable
  * Bottom line is result observable
* Marble Diagram Symbols
  * Marble is value emitted by observable. Generally represented by solid circle
  * Pipe symbol `|` represents completion of sequence
  * `X` symbol is used to represent error in sequence
* Helpful resources:
  * [RxMarbles](https://rxmarbles.com/)
  * [RxVisualizer](https://rxviz.com/)
  * [Jasmine Marbles](https://www.npmjs.com/package/jasmine-marbles): a node package that integrates with RxJS Scheduler
   and allows us to assert the behavior of observables and operators synchronously
* Time Frame:
  * Virtual Time: `-------`
  * Each `-` is a frame that represents a virtual time (unit of time elapsed)
  * Moves from left to right
  * First frame is a zero frame, each dash after 0 is 10 frames
  * One frame is 10 milliseconds of time elapsed
  * Maximum of 740 frames
* Marble syntax:
  * `-` Time, each frame represents 10ms of time
  * `|` The successful completion of an observable
  * `#` An error terminating the observable
  * `^` Subscription point to the hot observable
  * `!` Unsubscription point at which a subscription is unsubscribed
  * `a` Any character value being emitted by the producer
  * `()` Emit a single grouped value on same time frame
  * `|` EMPTY is an Observable that emits no items but terminates normally
    * Can be represented by a single pipe
  * `-` NEVER is an Observable that emits no items and does not terminate
    * Can be represented by a single dash or multiple dashes
* Basic example:

```javascript
import { cold } from 'jasmine-marbles';
import { NEVER, EMPTY } from 'rxjs';

describe('Marble Syntax', () => {
  describe('EMPTY', () => {
    it('emits no items but terminates normally', () => {
      const provided = EMPTY;
      const expected = cold('|'); // cold creates a mock Observable

      expect(provided).toBeObservable(expected);
    });
  });

  describe('NEVER', () => {
    it('emits no items and does not terminate', () => {
      const provided = NEVER;
      const expected = cold('-');
      const expected2 = cold('----');

      expect(provided).toBeObservable(expected);
      expect(provided).toBeObservable(expected2);
    });
  });
});
```

## Unit Testing with Hot and Cold Observables

* Hot and Cold Observables
  * Building blocks of RxJS
    * Producer: Gets values and passes them to the observer
    * Observable: Ties an observer to a producer
    * Observer: Listens to producer
  * Hot Observable
    * Closes over the producer
    * Start emitting values regardless of any subscription
    * All subscribers get latest values
    * Usually multicast
    * Examples
      * Tuning into a radio channel
      * Cinema theater
      * Mouse clicks
      * Live movies / Netflix / etc.
      * Stock tickers
      * `src/hot-cold/hot.js`
  * Cold Observable
    * Creates and activates producer
    * Start emitting values upon subscription
    * Subscriber gets their copy of values
    * Usually unicast
      * One subscriber per producer
    * RxJS observables
      * `Of`, `from`, `interval` and `timer`
    * Examples
      * Watching downloaded movies
      * Recorded podcast or song
      * `src/hot-cold/cold.js`
  * Testing Hot and Cold Observables
    * `src/hot-cold/cold.spec.ts`
    * `src/hot-cold/hot.spec.ts`
    * Frame: Jasmine-marbles converts observable sequences into frames. A frame is JSON that consists of a RxJS notification object that wraps the actual delivered value with additional metadata and message type.
```
{
    "frame": 0,
    "notification": {
           "error": undefined | "error",
           "kind": "N" | "C" | "E", // Next, complete, error
           "hasValue": true | false,
           "value": "a"
    }
}
```

## Unit Testing by Mocking Observable Values and Testing RxJS Operators

* Code Example:
  * `src/hot-cold/hot.spec.ts`
  
* Mocking Observables:
  * The `cold('marbles', mock-object)` method can take two parameters 
    * The first parameter is the marble diagram
    * The second parameter is the mock object for emitted values
  * Example: `cold('(x|)', { x: 'orange' })`
  * Code Example: `src/hot-cold/mocking-observable-values.spec.ts`

