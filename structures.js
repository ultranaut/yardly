function Stack() {
  'use strict';
  var
    dataStore = [],
    top       = 0;

  function examine() {
    return dataStore.slice(0, top);
  }

  function push(el) {
    dataStore[top++] = el;
  }

  function pop() {
    return dataStore[--top];
  }

  function length() {
    return top;
  }

  function peek() {
    return dataStore[top-1];
  }

  function clear() {
    top = 0;
  }

  this.push    = push;
  this.pop     = pop;
  this.length  = length;
  this.peek    = peek;
  this.clear   = clear;
  this.examine = examine;
}

