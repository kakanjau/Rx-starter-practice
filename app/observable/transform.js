"use strict";
const Rx = require('rx');
const Observer = require('../tools/observer');
const log = console.log;

let source, subscription;
let observer = Observer.observer;
let observerWithNext = Observer.observerWithNext;

log("------------bufferWithCount------------");
Rx.Observable.range(1,10)
  .bufferWithCount(2,4)
  .subscribe(observer());

/*log("------------buffer------------");
Rx.Observable.interval(100)
  .take(20)
  .buffer( Rx.Observable.generateWithRelativeTime(
    0, 
    x => x < 5,
    x => x + 1,
    x => x,
    x => 1000 * x))
  .subscribe(observer());

log("------------bufferWithTime------------");
Rx.Observable.generateWithRelativeTime(
  0,
  x => x < 20,
  x => x + 1,
  x => x,
  x => Math.round(Math.random()*10)*100)
  .timeInterval()
  .bufferWithTime(1000)
  .subscribe(observer());
*/

/*log("------------selectMany------------");
Rx.Observable.of(1,2,3)
  .selectMany(x => Promise.resolve(x+1))
  .subscribe(observer());

log("------------selectMany------------");
Rx.Observable.of(1,2,3)
  .selectMany(x => Promise.resolve(x+1))
  .subscribe(observer());

log("------------flatMapLatest------------");
Rx.Observable.of(1,2)
  .flatMapLatest(x => Rx.Observable.range(x, 2))
  .subscribe(observer());
*/

log("------------groupBy------------");
Rx.Observable.of(1,2,3,2,3,4,1)
  .groupBy(
    x => x)
  .subscribe(Rx.Observer.create(
      x => { 
        console.log(x.count().subscribe(c => log('key: '+x.key, ', count: '+c))); },
      err => console.log('Error:', err),
      () => console.log('Completed')
    ));

log("-------------sum---------------");
Rx.Observable.range(0,9).sum()
  .subscribe(observer());
Rx.Observable.fromArray([{value:1},{value:2},{value:3}])
  .sum(x => x.value)
  .subscribe(observer());

log("-------------scan---------------");
Rx.Observable.range(1,6)
  .scan((acc, x) => acc + x)
  .subscribe(observer());
  
Rx.Observable.range(1,6)
  .scan((acc, x) => {return acc + x}, 10)
  .subscribe(observer());
 
log("-------------expand-------------");
Rx.Observable.repeat(1,6)
  .expand(x => Rx.Observable.just(20+x))
  .take(10)
  .subscribe(observer());