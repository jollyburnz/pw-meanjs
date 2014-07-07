'use strict';

//Wires service used to communicate Wires REST endpoints
angular.module('wires').factory('Wires', ['$resource', function($resource) {
    return $resource('wires/:wireId', {
        wireId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);