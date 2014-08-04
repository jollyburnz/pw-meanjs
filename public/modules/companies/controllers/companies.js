'use strict';

// Companies controller
angular.module('companies').controller('CompaniesController', ['$scope', '$stateParams','$filter', '$location', 'Authentication', 'Companies', 'Funds', 'Keyupdates', 'Articles', 'Investments',
    function($scope, $stateParams, $filter, $location, Authentication, Companies, Funds, Keyupdates, Articles, Investments) {
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
                image: this.url,
                description: this.description,
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
                from_fund: this.from_fund,
                ceo_name: this.ceo_name,
                ceo_email: this.ceo_email,
                address1: this.address1,
                address2: this.address2,
                url: this.url,
                is_featured: this.is_featured,
                is_va: this.is_va
            });

            // Redirect after save
            company.$save(function(response) {
                $location.path('companies');
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
            console.log(company, 'company');

            company.$update(function() {
                $location.path('companies');
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
              $scope.keyupdates = $filter('filter')(keyupdates, {company: $stateParams.companyId});
              console.log($scope.keyupdates);
            });

            Investments.query(function(investments) {
              $scope.invest = $filter('filter')(investments, {for_company: $stateParams.companyId});
              console.log($scope.invest, 'yoyo');
            });

            Articles.query(function(articles){
                //chunking up the articles in a 3 col bootstrap grid
                var chunk;

                chunk = function(a, s) {
                  var i, _i, _ref, _results;
                  if (a.length === 0) {
                    return [];
                  } else {
                    _results = [];
                    for (i = _i = 0, _ref = a.length - 1; s > 0 ? _i <= _ref : _i >= _ref; i = _i += s) {
                      _results.push(a.slice(i, +(i + s - 1) + 1 || 9e9));
                    }
                    return _results;
                  }
                };

                $scope.articles = $filter('filter')(articles, {for_company: $stateParams.companyId});
                $scope.articles_keyupdates = $filter('filter')(articles, {for_company: $stateParams.companyId, is_keyupdate: true});

                $scope.$watch('articles', function(){
                    $scope.rows = chunk($scope.articles, 3)
                    console.log($scope.rows, 'rows')
                });
            });
        };

        $scope.updateImage = function(){
            console.log('update image');
            filepicker.pick(function(InkBlob){
                console.log(InkBlob.url);
                $scope.company.image = InkBlob.url;
                $('#CompanyImage').html("<img src='" + $scope.company.image+ "' />");
            });
        };

        // $scope.imagefill = function(){
        //     console.log('imagefill');
        //     $('.article-photo').imagefill();
        // };
    }
]);