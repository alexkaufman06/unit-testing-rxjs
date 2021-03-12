const { interval } = require('rxjs');
const { share, map } = require('rxjs/operators');

const log = console.log;

const sourceObservable = interval(1000).pipe(
    map(s => s + 1),
    share()
);

setTimeout(function() {
  log('subscriber1' + ' joined after: ' + 2 + ' seconds');
  sourceObservable.subscribe(s => log('subscriber1 received:', s));

  setTimeout(function() {
    log('subscriber2' + ' joined after: ' + 5 + ' seconds');
    sourceObservable.subscribe(s => log('subscriber2 received: ', s));
  }, 5000);
}, 2000);
