'use strict';

angular.module('YardApp')
  .factory('Stack', function () {
    var dataStore = [];

    function examine() {
      return dataStore;
    }

    function push(el) {
      dataStore.push(el);
    }

    function pop() {
      return dataStore.pop();
    }

    function isEmpty() {
      return !dataStore.length;
    }

    function peek() {
      return dataStore[dataStore.length - 1];
    }

    function clear() {
      // http://stackoverflow.com/a/17306971/452233
      while (dataStore.length > 0) {
        dataStore.pop();
      }
    }

    return {
      push: push,
      pop: pop,
      isEmpty: isEmpty,
      peek: peek,
      clear: clear,
      examine: examine
    };
  });

