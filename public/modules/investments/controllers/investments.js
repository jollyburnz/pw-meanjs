'use strict';

// Investments controller
angular.module('investments').controller('InvestmentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Investments', 'Companies',
    function($scope, $stateParams, $location, Authentication, Investments, Companies) {
        $scope.authentication = Authentication;

        Companies.query(function(companies) {
          console.log(companies, 'companies');
          $scope.companies = companies;
        });

        // Create new Investment
        $scope.create = function() {
        	// Create new Investment object
            var investment = new Investments({
                date: this.date,
                amount: this.amount,
                for_company: this.for_company
            });

            // Redirect after save
            investment.$save(function(response) {
                $location.path('investments');
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
                $location.path('investments');
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

        $scope.offsetDate = function(date){
          var localDate = new Date(date);
          var localTime = localDate.getTime();
          var localOffset = localDate.getTimezoneOffset() * 60000;
          return new Date(localTime + localOffset);
        };
    }
]);