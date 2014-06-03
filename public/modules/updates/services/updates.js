'use strict';

//Updates service used to communicate Updates REST endpoints
angular.module('updates').factory('Updates', ['$resource', function($resource) {
    return $resource('updates/:updateId', {
        updateId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);