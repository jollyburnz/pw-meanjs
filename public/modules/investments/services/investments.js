'use strict';

//Investments service used to communicate Investments REST endpoints
angular.module('investments').factory('Investments', ['$resource', function($resource) {
    return $resource('investments/:investmentId', {
        investmentId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);