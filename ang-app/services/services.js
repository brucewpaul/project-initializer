'use strict';

angular.module('myApp.services', [])

.factory('Items', function ($http, $location) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/items'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var addOne = function(item) {
    return $http({
      method: 'POST',
      url: '/api/Items',
      data: item
    })
    .then(function(resp) {
      // $location.path('/home');
    });
  };

  return {
    getAll: getAll,
    addOne: addOne
  };
})