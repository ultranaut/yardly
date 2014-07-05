/* global _ */

var output = [],
    stack = [];

function precedence(token) {
  var values = {
    '^': 4,
    '*': 3,
    '/': 3,
    '+': 2,
    '-': 2
  };
  return values[token];
}

function shunt(e, i, l) {
  console.log('token:', e);
  if (_.isNumber(e)) {
    //console.log(e + ' is a number, so push it onto the output');
    output.push(e);
  }
  else {
    //console.log(e + ' is an operator, so deal with the stack');
    if (!stack.length) {
      //console.log('stack is empty so push', e, 'onto it');
      stack.push(e);
    }
    else {
      //console.log(e,'has precedence', precedence[e]);
      //console.log(_.last(stack),'has precedence', precedence[_.last(stack)]);

      while (precedence(e) <= precedence(_.last(stack))) {
        output.push(stack.pop());
      }
      stack.push(e);
    }
  }
  //console.log('currently:');
  console.log('stack', stack);
  console.log('output', output);
  console.log('----------');
}

function parseInfix(tokens) {
  console.log(tokens);
  console.log('----------');
  var precedence = {
        '^': 4,
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2
      },
      e;
  _.each(tokens, shunt, this);

  // unwind whatever remains on the stack
  while (stack.length) {
    output.push(stack.pop());
  }
  return output;
}
