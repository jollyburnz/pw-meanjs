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

    $scope.test = function(fund) {
      $scope.investedCapital = fund.investedCapital;
      $scope.mark = fund.mark;
      $scope.IRR = fund.IRR;
      $scope.multiple = fund.multiple;
    };
	}
]);