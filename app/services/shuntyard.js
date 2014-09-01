'use strict';

angular.module('YardApp')
  .factory('ShuntYard', ['Structures', function (Structures) {
    // basic data structures
    var outputQueue = [];
    var operatorStack  = new Structures.Stack();
    var precedence = {
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

    var clearOutputQueue = function () {
      outputQueue = [];
    };

    var dumpStack = function () {
      console.log('time to unwind', operatorStack.examine());
      while (!operatorStack.isEmpty()) {
        outputQueue.push(operatorStack.pop());
      }
    };

    /**
     * Receives a token and operates on the output queue
     * and operator stack accordingly
     */
    function hump(token) {
      console.log('token:', token);
      // http://stackoverflow.com/questions/18082
      if (!isNaN(parseFloat(token)) && isFinite(token)) {
        outputQueue.push(token);
      }
      else if (token === '(') {
        operatorStack.push(token);
      }
      else if (token === ')') {
        while (!operatorStack.isEmpty() && operatorStack.peek() !== '(') {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.pop();
      }
      else {
        while (!operatorStack.isEmpty() &&
              operatorStack.peek() !== '(' &&
              getPrecedence(token) <= getPrecedence(operatorStack.peek()) &&
              getAssoc(operatorStack.peek()) === 'left') {
          console.log(getPrecedence(token), getPrecedence(operatorStack.peek()));
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      }
      console.log('operatorStack', operatorStack.examine());
      console.log('outputQueue', outputQueue);
      console.log('----------');
    }

    function parse(tokens) {
      clearOutputQueue();
      console.log('INFIX:', tokens.join(' '));
      console.log(tokens);
      console.log('----------');
      _.each(tokens, hump);

      dumpStack();
      console.log('RPN:', outputQueue.join(' '));
      return outputQueue;
    }

    function evaluate(queue) {
      var
        evalStack = new Structures.Stack(),
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
              break;
          }
        }
        console.log(queue);
        console.log(evalStack.examine());
        console.log('----------');
      }
      return evalStack.pop();
    }

    return {
      parse: parse,
      evaluate: evaluate
    };
  }]);

