'use strict';

// Partners controller
angular.module('partners').controller('PartnersController', ['$scope', '$filter', '$stateParams', '$location', 'Authentication', 'Partners', 'Users',
    function($scope, $filter, $stateParams, $location, Authentication, Partners, Users) {
        $scope.authentication = Authentication;

        // Create new Partner
        $scope.create = function() {
        	// Create new Partner object
            var partner = new Partners({
                name: this.name
            });

            // Redirect after save
            partner.$save(function(response) {
                $location.path('partners/' + response._id);
            });

            // Clear form fields
            this.name = '';
        };

        // Remove existing Partner
        $scope.remove = function(partner) {
            if (partner) {
                partner.$remove();

                for (var i in $scope.partners) {
                    if ($scope.partners[i] === partner) {
                        $scope.partners.splice(i, 1);
                    }
                }
            } else {
                $scope.partner.$remove(function() {
                    $location.path('partners');
                });
            }
        };

        // Update existing Partner
        $scope.update = function() {
            var partner = $scope.user;

            partner.$update(function() {
                $location.path('partners');
            });
        };

        // Find a list of Partners
        $scope.find = function() {
            Users.query(function(users) {
                $scope.users = users;
            });
        };

        // Find existing Partner
        $scope.findOne = function() {
            Users.query(function(users){
                console.log(users, 'users');
                $scope.user = $filter('filter')(users, {_id: $stateParams.partnerId}, true)[0];
            });
        };
    }
]);