/* global _ */

(function () {

  // Creat the shunt object
  var shunt = {};

  // basic data structures
  var
    outputQueue = [],
    opStack  = [],
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
    console.log('time to unwind', opStack);
    while (opStack.length) {
      outputQueue.push(opStack.pop());
    }
  };

  // keeping with the railroad terminology
  function hump(e) {
    console.log('token:', e);
    if (_.isNumber(e)) {
      outputQueue.push(e);
    }
    else if (e === '(') {
      opStack.push(e);
    }
    else if (e === ')') {
      while (_.last(opStack) && _.last(opStack) !== '(') {
        outputQueue.push(opStack.pop());
      }
      opStack.pop();
    }
    else {
      while (_.last(opStack) &&
             _.last(opStack) !== '(' &&
             getPrecedence(e) <= getPrecedence(_.last(opStack)) &&
             getAssoc(_.last(opStack)) === 'left') {
        console.log(getPrecedence(e), getPrecedence(_.last(opStack)));
        outputQueue.push(opStack.pop());
      }
      opStack.push(e);
    }
    console.log('opStack', opStack);
    console.log('outputQueue', outputQueue);
    console.log('----------');
  }

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
