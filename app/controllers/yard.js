'use strict';

angular.module('YardApp')
  .controller('YardCtrl', ['$scope', 'Tokenizer', 'ShuntYard', function($scope, Tokenizer, ShuntYard) {

    $scope.expression = '';
    $scope.tokens = [];
    $scope.outputQueue = [];

    $scope.parseExpression = function () {
      $scope.tokens = Tokenizer.tokenize($scope.expression);
    };

    $scope.shunt = {
      parse: function () {
        $scope.outputQueue = ShuntYard.parse($scope.tokens);
        console.log($scope.outputQueue);
      },
      evaluate: function () {
        $scope.evaluated = ShuntYard.evaluate($scope.outputQueue.slice());
        console.log($scope.evaluated);
      }
    };

    $scope.expression = '3 + 4 * 2 / (1-5)^2^3';
    $scope.parseExpression();
  }]);
