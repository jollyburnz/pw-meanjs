'use strict';

angular.module('funds').controller('FundController', ['$scope', '$filter', 'Funds', 'Companies',
    function($scope, $filter, Funds, Companies) {
		// Controller Logic 
		// ...
    // Find a list of Funds
    Funds.query(function(funds) {
      console.log(funds);
      $scope.funds = funds;
      $scope.first = funds[2];
    });

    $scope.test = function(fund) {
      console.log(fund._id, 'id');
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

      $scope.activeState = fund.name;

      $scope.p = 'baseline'; //default on baseline

      Companies.query(function(companies) {
        console.log(companies);
        $scope.companies = companies;
        console.log($scope.companies, 'companies');
        console.log(fund._id);
        $scope.filtered = $filter('filter')($scope.companies, {from_fund: fund._id });
      });

    };

    $scope.isActive = function(fund){
      var active = (fund.name === $scope.activeState);
      return active;
    };

    $scope.projection = function(projection){
      console.log(projection);
      $scope.p = projection;
    };

    $scope.getProjection = function(){
      console.log($scope.p, 'projection');
      return $scope.p;
    };
	}
]);