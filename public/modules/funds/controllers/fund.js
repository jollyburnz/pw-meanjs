'use strict';

angular.module('funds').controller('FundController', ['$scope', '$stateParams', '$location', 'Funds',
    function($scope, $stateParams, $location, Funds) {
		// Controller Logic 
		// ...
    // Find a list of Funds
    console.log(Funds);
    Funds.query(function(funds) {
      console.log(funds);
      $scope.funds = funds;
    });
	}
]);