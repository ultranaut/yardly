function Stack() {
  'use strict';

  var dataStore = [];

  this.push = function (el) {
    dataStore.push(el);
  };

  this.pop = function () {
    return dataStore.pop();
  };

  this.isEmpty = function () {
    return !dataStore.length;
  };

  this.peek = function () {
    return dataStore[dataStore.length - 1];
  };

  this.clear = function () {
    // http://stackoverflow.com/a/17306971/452233
    while (dataStore.length > 0) {
      dataStore.pop();
    }
  };

  this.examine = function () {
    return dataStore;
  };
}

