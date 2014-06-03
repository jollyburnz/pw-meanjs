'use strict';

// Companies controller
angular.module('companies').controller('CompaniesController', ['$scope', '$stateParams','$filter', '$location', 'Authentication', 'Companies', 'Funds', 'Keyupdates',
    function($scope, $stateParams, $filter, $location, Authentication, Companies, Funds, Keyupdates) {
        $scope.authentication = Authentication;

        Funds.query(function(funds) {
          console.log(funds, 'funds');
          $scope.funds = funds;
        });

        // Create new Company
        $scope.create = function() {
        	// Create new Company object
            var company = new Companies({
                name: this.name,
                initial_investment: this.initial_investment,
                fund_ownership: this.fund_ownership,
                ev: this.ev,
                irr: this.irr,
                multiple: this.multiple,
                d_cash: this.d_cash,
                d_ev: this.d_ev,
                d_multiple: this.d_multiple,
                b_cash: this.b_cash,
                b_ev: this.b_ev,
                b_multiple: this.b_multiple,
                u_cash: this.u_cash,
                u_ev: this.u_ev,
                u_multiple: this.u_multiple,
                from_fund: this.from_fund
            });

            // Redirect after save
            company.$save(function(response) {
                $location.path('companies/' + response._id);
            });

            // Clear form fields
            this.name = '';
        };

        // Remove existing Company
        $scope.remove = function(company) {
            if (company) {
                company.$remove();

                for (var i in $scope.companies) {
                    if ($scope.companies[i] === company) {
                        $scope.companies.splice(i, 1);
                    }
                }
            } else {
                $scope.company.$remove(function() {
                    $location.path('companies');
                });
            }
        };

        // Update existing Company
        $scope.update = function() {
            var company = $scope.company;

            company.$update(function() {
                $location.path('companies/' + company._id);
            });
        };

        // Find a list of Companies
        $scope.find = function() {
            Companies.query(function(companies) {
                $scope.companies = companies;
            });
        };

        // Find existing Company
        $scope.findOne = function() {
            Companies.get({
                companyId: $stateParams.companyId
            }, function(company) {
                $scope.company = company;
            });

            Keyupdates.query(function(keyupdates) {
              console.log(keyupdates, 'key updates');
              //$scope.keyupdates = keyupdates;
              $scope.keyupdates = $filter('filter')(keyupdates, {company: $stateParams.companyId});
              console.log($scope.keyupdates);
            });
        };
    }
]);