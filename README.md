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
  
