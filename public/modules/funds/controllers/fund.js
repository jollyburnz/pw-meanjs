'use strict';

angular.module('funds').controller('FundController', ['$scope', 'Funds',
    function($scope, Funds) {
		// Controller Logic 
		// ...
    // Find a list of Funds
    Funds.query(function(funds) {
      console.log(funds);
      $scope.funds = funds;
    });
	}
]);