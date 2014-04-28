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

      $scope.d_mark = fund.d_mark;
      $scope.d_IRR = fund.d_IRR;
      $scope.d_multiple = fund.d_multiple;

      $scope.b_mark = fund.b_mark;
      $scope.b_IRR = fund.b_IRR;
      $scope.b_multiple = fund.b_multiple;

      $scope.u_mark = fund.u_mark;
      $scope.u_IRR = fund.u_IRR;
      $scope.u_multiple = fund.u_multiple;

      $scope.activeState = fund.name
    };

    $scope.isActive = function(fund){
      var active = (fund.name === $scope.activeState);
      return active;
    };
	}
]);