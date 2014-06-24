'use strict';

// Investments controller
angular.module('investments').controller('InvestmentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Investments',
    function($scope, $stateParams, $location, Authentication, Investments) {
        $scope.authentication = Authentication;

        // Create new Investment
        $scope.create = function() {
        	// Create new Investment object
            var investment = new Investments({
                name: this.name
            });

            // Redirect after save
            investment.$save(function(response) {
                $location.path('investments/' + response._id);
            });

            // Clear form fields
            this.name = '';
        };

        // Remove existing Investment
        $scope.remove = function(investment) {
            if (investment) {
                investment.$remove();

                for (var i in $scope.investments) {
                    if ($scope.investments[i] === investment) {
                        $scope.investments.splice(i, 1);
                    }
                }
            } else {
                $scope.investment.$remove(function() {
                    $location.path('investments');
                });
            }
        };

        // Update existing Investment
        $scope.update = function() {
            var investment = $scope.investment;

            investment.$update(function() {
                $location.path('investments/' + investment._id);
            });
        };

        // Find a list of Investments
        $scope.find = function() {
            Investments.query(function(investments) {
                $scope.investments = investments;
            });
        };

        // Find existing Investment
        $scope.findOne = function() {
            Investments.get({
                investmentId: $stateParams.investmentId
            }, function(investment) {
                $scope.investment = investment;
            });
        };
    }
]);