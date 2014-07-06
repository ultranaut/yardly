/* global _, Stack */

(function () {
  'use strict';

  // Creat the shunt object
  var shunt = {};

  // basic data structures
  var
    outputQueue = [],
    opStack  = new Stack(),
    precedence = {
      '^': { 'val': 4, 'assoc': 'right' },
      '*': { 'val': 3, 'assoc': 'left' },
      '/': { 'val': 3, 'assoc': 'left' },
      '+': { 'val': 2, 'assoc': 'left' },
      '-': { 'val': 2, 'assoc': 'left' }
    };

  // operator precedence object
  var getPrecedence = function (operator) {
    operator = precedence[operator];
    if (operator) {
      return operator.val;
    }
    else {
      return null;
    }
  };

  var getAssoc = function (operator) {
    operator = precedence[operator];
    if (operator) {
      return operator.assoc;
    }
    else {
      return null;
    }
  };

  var dumpStack = function () {
    console.log('time to unwind', opStack.examine());
    while (opStack.length()) {
      outputQueue.push(opStack.pop());
    }
  };

  // keeping with the railroad terminology
  function hump(e) {
    console.log('token:', e);
    // http://stackoverflow.com/questions/18082
    if (!isNaN(parseFloat(e)) && isFinite(e)) {
      outputQueue.push(e);
    }
    else if (e === '(') {
      opStack.push(e);
    }
    else if (e === ')') {
      while (opStack.length() && opStack.peek() !== '(') {
        outputQueue.push(opStack.pop());
      }
      opStack.pop();
    }
    else {
      while (opStack.length() &&
             opStack.peek() !== '(' &&
             getPrecedence(e) <= getPrecedence(opStack.peek()) &&
             getAssoc(opStack.peek()) === 'left') {
        console.log(getPrecedence(e), getPrecedence(opStack.peek()));
        outputQueue.push(opStack.pop());
      }
      opStack.push(e);
    }
    console.log('opStack', opStack.examine());
    console.log('outputQueue', outputQueue);
    console.log('----------');
  }

  shunt.tokenize = function (string) {
    var
      re = /(?:(\d+)|([^\s]))/g,
      res = string.match(re);
    return res;
  };

  shunt.parse = function (tokens) {
    console.log('INFIX:', tokens.join(' '));
    console.log(tokens);
    console.log('----------');
    _.each(tokens, hump);

    dumpStack();
    console.log('RPN:', outputQueue.join(' '));
    return outputQueue;
  };

  // create the global object
  this.shunt = shunt;
}).call(this);
