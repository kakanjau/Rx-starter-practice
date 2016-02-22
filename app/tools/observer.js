"use strict";
const Rx = require('rx');

module.exports = {
  observer: function() {
    return Rx.Observer.create(
      function (x) { console.log(x); },
      function (err) { console.log('Error:', err); },
      function () { console.log('Completed'); });
  },
  observerWithNext: function(){ 
    return Rx.Observer.create(
      function (x) { console.log("next:" + x); },
      function (err) { console.log('Error:', err); },
      function () { console.log('Completed'); });
  }
};
