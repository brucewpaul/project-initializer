'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.html',
      controller: 'HomeController'
    });
}])

.controller('HomeController', ['$scope', function($scope) {

  $scope.data = {};

  $scope.data.items = [
    {text: 'This is a test'},
    {text: 'Another test'}
  ];

}]);