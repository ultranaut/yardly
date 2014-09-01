'use strict';

angular.module('YardApp', ['ngRoute'])
  .value('version', '0.1')

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/yard.html',
        controller: 'YardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

