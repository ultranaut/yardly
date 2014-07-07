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
    while (!opStack.isEmpty()) {
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
      while (!opStack.isEmpty() && opStack.peek() !== '(') {
        outputQueue.push(opStack.pop());
      }
      opStack.pop();
    }
    else {
      while (!opStack.isEmpty() &&
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

  shunt.evaluate = function (queue) {
    var
      evalStack = new Stack(),
      curr, operand1, operand2;
    while (queue.length) {
      curr = queue.shift();
      if (!isNaN(parseFloat(curr)) && isFinite(curr)) {
        evalStack.push(parseFloat(curr));
      }
      else {
        operand2 = evalStack.pop();
        operand1 = evalStack.pop();
        switch(curr) {
          case '+':
            evalStack.push(operand1 + operand2);
            break;
          case '-':
            evalStack.push(operand1 - operand2);
            break;
          case '*':
            evalStack.push(operand1 * operand2);
            break;
          case '/':
            evalStack.push(operand1 / operand2);
            break;
          case '^':
            evalStack.push(Math.pow(operand1, operand2));
            break;
          default:
            var nothing = true;
        }
      }
      console.log(queue);
      console.log(evalStack.examine());
      console.log('----------');
    }
    return evalStack.pop();
  };

  // create the global object
  this.shunt = shunt;
}).call(this);
