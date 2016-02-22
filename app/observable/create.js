"use strict";
const Rx = require('rx');
const Observer = require('../tools/observer');
const log = console.log;

let source, subscription;
let observer = Observer.observer;
let observerWithNext = Observer.observerWithNext;

log("------------Using create------------");
Rx.Observable.create(observer => {
  observer.onNext(42);
  observer.onCompleted();
  return () => {console.log('disposed')}
}).subscribe(observerWithNext());

Rx.Observable.create(observer => {
  observer.onNext(42);
  observer.onCompleted();
  return Rx.Disposable.create(() => {log('disposed')})
}).subscribe(observerWithNext());

log("------------Using generate------------");
Rx.Observable.generate(
  0,
  (x) => x < 3,
  (x) => x + 1,
  (x) => x
).subscribe(observerWithNext());

/*log("------------Using generateWithRelativeTime------------");
source = Rx.Observable.generateWithRelativeTime(
  0,
  (x) => x < 3,
  (x) => x + 1,
  (x) => x,
  (x) => 1000
).timeInterval();

subscription = source.subscribe(
    (x) => {log(x);}, 
    (err) => {log('Error:' + err);},
    () => {log('Completed');}
  );

log("------------Using generateWithAbsoluteTime------------");
source = Rx.Observable.generate(
  1,
  (x) => x < 3,
  (x) => x + 1,
  (x) => x,
  (x) => Date.now() + 10000
).timeInterval();

subscription = source.subscribe(
    (x) => {log(x);}, 
    (err) => {log('Error:' + err);},
    () => {log('Completed');}
  );
*/
log("------------Using defer------------");
Rx.Observable.defer(
  () => {
    return Rx.Observable.return(42);
  }
).subscribe(observer());

log("------------Using if------------");
Rx.Observable.if(
  () => true,
  Rx.Observable.return(1),
  Rx.Observable.return(0)
).subscribe(observer());


log("------------Using from------------");
Rx.Observable.from([1,2,3])
.subscribe(observer());

Rx.Observable.from(new Set(["foo", Object]))
.subscribe(observer());

Rx.Observable.from(new Map([[1,2],[3,4]]))
.subscribe(observer());

Rx.Observable.from([1,2,3], (x) => x+x)
.subscribe(observer());


log("------------Using fromCallback------------");
let cbFromCallback = function(x, cb){
  cb(x);
};
let fromCallbackObg = Rx.Observable.fromCallback(cbFromCallback);
fromCallbackObg(false).subscribe(observer());

log("------------Using fromNodeCallback------------");
let cbFromNodeCallback = function(x, y, cb){
  cb(false, x, y);
};
let fromNodeCallbackObg = Rx.Observable.fromNodeCallback(cbFromNodeCallback);
fromNodeCallbackObg(1,2).subscribe(observer());

log("------------Using fromEvent------------");
let EventEmitter = require('events').EventEmitter;
let eventEmitter = new EventEmitter();
Rx.Observable.fromEvent(
  eventEmitter,
  'data',
  function(first, second){
    return {foo: first, bar: second}
  }
).subscribe(observer());
eventEmitter.emit('data', '111', '222');
eventEmitter.emit('data', '333', '444');

log("------------Using of------------");
Rx.Observable.of(4)
.subscribe(observerWithNext());

/*log("------------Using fromPromise------------");
Rx.Observable.fromPromise(new Promise((resolve, reject) => {
  resolve(123);
})).subscribe(observerWithNext());

let promise = new Promise((resolve, reject) => {
  resolve(123);
});
promise.then(val => {
  log('promise resolve: ' + val);
}).catch(error => log('error: ' + error));*/

log("----------Using pairs------------");
var obj = {
  foo: 42,
  bar: 56,
  baz: 78
};
Rx.Observable.pairs(obj)
.subscribe(observerWithNext());

/*log("------------Using interval------------");
source = Rx.Observable.interval(1000)
  .timeInterval()
  .take(5);
source
  .first(() => true)
  .subscribe(
    x => console.log("------------Using interval------------"),
    err => console.log('Error:', err),
    () => {});
source.subscribe(observer());*/

log("------------Using just------------");
Rx.Observable.just(123)
.subscribe(observer());
  
log("------------Using range------------");
Rx.Observable.range(100,10)
.subscribe(observer());

log("------------Using repeat------------");
Rx.Observable.repeat(123,3)
.subscribe(observer());

log("------------Using doWhile------------");
let i=0;
Rx.Observable.just(123).doWhile(x => ++i <2)
.subscribe(observer());

log("------------Using while------------");
i = 0;
Rx.Observable.while(
  () => i++ < 3,
  Rx.Observable.just(321)
  // new Promise((resolve, reject) => resolve(222))
).subscribe(observer());

log("------------Using start----------");
Rx.Observable.start( () => 233)
  .subscribe(observer());

log("------------Using timer------------");
Rx.Observable.timer(100,100)
  .timeInterval()
  .take(5)
  .subscribe(observer());
