# Unit Testing RxJS with Marble Diagrams
This is repository serves as documentation on learnings from watching the PluralSight course on this subject.

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
```
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
