'use strict';

// Funds controller
angular.module('funds').controller('FundsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Funds',
    function($scope, $stateParams, $location, Authentication, Funds) {
        $scope.authentication = Authentication;

        $scope.user = Authentication.user;
        if (!$scope.user) $location.path('/');

        // Create new Fund
        $scope.create = function() {
        	// Create new Fund object
            var fund = new Funds({
                name: this.name,
                investedCapital: this.investedCapital,
                mark: this.mark,
                IRR: this.IRR,
                multiple: this.multiple,
                d_mark: this.d_mark,
                d_IRR: this.d_IRR,
                d_multiple: this.d_multiple,
                b_mark: this.b_mark,
                b_IRR: this.b_IRR,
                b_multiple: this.b_multiple,
                u_mark: this.u_mark,
                u_IRR: this.u_IRRR,
                u_multiple: this.u_multiple,
                updated: new Date()
            });

            // Redirect after save
            fund.$save(function(response) {
                $location.path('funds/' + response._id);
            });

            // Clear form fields
            this.name = '';
            this.investedCapital = '';
            this.mark = '';
            this.IRR = '';
            this.multiple = '';
            this.d_mark = '';
            this.d_IRR = '';
            this.d_multiple = '';
            this.b_mark = '';
            this.b_IRR = '';
            this.b_multiple = '';
            this.u_mark = '';
            this.u_IRR = '';
            this.u_multiple = '';
        };

        // Remove existing Fund
        $scope.remove = function(fund) {
            if (fund) {
                fund.$remove();

                for (var i in $scope.funds) {
                    if ($scope.funds[i] === fund) {
                        $scope.funds.splice(i, 1);
                    }
                }
            } else {
                $scope.fund.$remove(function() {
                    $location.path('funds');
                });
            }
        };

        // Update existing Fund
        $scope.update = function() {
            $scope.fund.updated = new Date()
            var fund = $scope.fund;

            console.log(fund, $scope.fund.updated, 'updated');

            fund.$update(function() {
                $location.path('funds/' + fund._id);
            });
        };

        // Find a list of Funds
        $scope.find = function() {
            Funds.query(function(funds) {
                $scope.funds = funds;
            });
        };

        // Find existing Fund
        $scope.findOne = function() {
            Funds.get({
                fundId: $stateParams.fundId
            }, function(fund) {
                $scope.fund = fund;
            });
        };
    }
]);