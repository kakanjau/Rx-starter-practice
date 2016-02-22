"use strict";
const Rx = require('rx');
const Observer = require('../tools/observer');
const log = console.log;

let source, subscription;
let observer = Observer.observer;
let observerWithNext = Observer.observerWithNext;

log("--------------debounce----------------");
Rx.Observable.generateWithRelativeTime(
  0,
  x => x < 20,
  x => x + 1,
  x => x,
  x => Math.round(Math.random()*10)*100
).timeInterval()
  .debounce(1000)
  .subscribe(observer());