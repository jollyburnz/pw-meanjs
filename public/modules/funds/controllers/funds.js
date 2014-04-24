'use strict';

// Funds controller
angular.module('funds').controller('FundsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Funds',
    function($scope, $stateParams, $location, Authentication, Funds) {
        $scope.authentication = Authentication;

        // Create new Fund
        $scope.create = function() {
        	// Create new Fund object
            var fund = new Funds({
                name: this.name,
                investedCapital: this.investedCapital,
                mark: this.mark,
                IRR: this.IRR,
                multiple: this.multiple
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
            var fund = $scope.fund;

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