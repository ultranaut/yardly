'use strict';

angular.module('YardApp')
  .factory('Tokenizer', [function () {
    function tokenize(string) {
      var re = /(?:(\d+)|([^\s]))/g;
      return string.match(re);
    }

    return {
      tokenize: tokenize
    };
  }]);

