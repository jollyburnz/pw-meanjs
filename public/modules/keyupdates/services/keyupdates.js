'use strict';

//Keyupdates service used to communicate Keyupdates REST endpoints
angular.module('keyupdates').factory('Keyupdates', ['$resource', function($resource) {
    return $resource('keyupdates/:keyupdateId', {
        keyupdateId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);