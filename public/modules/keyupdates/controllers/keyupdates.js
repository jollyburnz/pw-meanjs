'use strict';

// Keyupdates controller
angular.module('keyupdates').controller('KeyupdatesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Keyupdates', 'Companies',
    function($scope, $stateParams, $location, Authentication, Keyupdates, Companies) {
        $scope.authentication = Authentication;

        $scope.user = Authentication.user;
        if (!$scope.user) $location.path('/');

        Companies.query(function(companies) {
          console.log(companies, 'companies');
          $scope.companies = companies;
        });

        // Create new Keyupdate
        $scope.create = function() {
        	// Create new Keyupdate object
            var keyupdate = new Keyupdates({
                keyupdate: this.keyupdate,
                source: this.source,
                company: this.company
            });

            // Redirect after save
            keyupdate.$save(function(response) {
                $location.path('keyupdates/' + response._id);
            });

            // Clear form fields
            this.name = '';
        };

        // Remove existing Keyupdate
        $scope.remove = function(keyupdate) {
            if (keyupdate) {
                keyupdate.$remove();

                for (var i in $scope.keyupdates) {
                    if ($scope.keyupdates[i] === keyupdate) {
                        $scope.keyupdates.splice(i, 1);
                    }
                }
            } else {
                $scope.keyupdate.$remove(function() {
                    $location.path('keyupdates');
                });
            }
        };

        // Update existing Keyupdate
        $scope.update = function() {
            var keyupdate = $scope.keyupdate;

            keyupdate.$update(function() {
                $location.path('keyupdates/' + keyupdate._id);
            });
        };

        // Find a list of Keyupdates
        $scope.find = function() {
            Keyupdates.query(function(keyupdates) {
                $scope.keyupdates = keyupdates;
            });
        };

        // Find existing Keyupdate
        $scope.findOne = function() {
            Keyupdates.get({
                keyupdateId: $stateParams.keyupdateId
            }, function(keyupdate) {
                $scope.keyupdate = keyupdate;
            });
        };
    }
]);