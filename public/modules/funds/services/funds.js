'use strict';

//Funds service used to communicate Funds REST endpoints
angular.module('funds').factory('Funds', ['$resource', function($resource) {
    return $resource('funds/:fundId', {
        fundId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);