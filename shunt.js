/* global _ */

(function () {

  // Creat the shunt object
  var shunt = {};

  // basic data structures
  var
    outputQueue = [],
    opStack  = [],
    precedence = {
      '^': 4,
      '*': 3,
      '/': 3,
      '+': 2,
      '-': 2
    };

  // operator precedence object
  var getPrecedence = function (operator) {
    return precedence[operator];
  };

  var dumpStack = function () {
    console.log('time to unwind', opStack);
    while (opStack.length) {
      outputQueue.push(opStack.pop());
    }
  };

  function hump(e, i, l) {
    console.log('token:', e);
    if (_.isNumber(e)) {
      //console.log(e + ' is a number, so push it onto the outputQueue');
      outputQueue.push(e);
    }
    else {
      //console.log(e + ' is an operator, so deal with the stack');
      if (!opStack.length) {
        //console.log('opStack is empty so push', e, 'onto it');
        opStack.push(e);
      }
      else {
        console.log(getPrecedence(e), getPrecedence(_.last(opStack)));

        while (getPrecedence(e) <= getPrecedence(_.last(opStack))) {
          outputQueue.push(opStack.pop());
        }
        opStack.push(e);
      }
    }
    console.log('opStack', opStack);
    console.log('outputQueue', outputQueue);
    console.log('----------');
  }

  shunt.parse = function (tokens) {
    console.log('INFIX:', tokens.join(' '));
    console.log('----------');
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
