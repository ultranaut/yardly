function Stack() {
  'use strict';

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

  this.push    = push;
  this.pop     = pop;
  this.isEmpty = isEmpty;
  this.peek    = peek;
  this.clear   = clear;
  this.examine = examine;
}

