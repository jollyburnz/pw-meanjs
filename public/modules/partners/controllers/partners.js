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
            var user = $scope.user;
            var user_revised = _.omit(user, 'password', 'salt', '$delete', '$get', '$query', '$remove', '$save', '$update');
            var user_updated = new Users(user_revised);
            console.log(user, user_revised, user_updated, 'USER!');

            user_updated.$update(function(response) {
                $scope.success = true;
                $location.path('partners')
            }, function(response) {
                $scope.error = response.data.message;
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

        //edit profile
        $scope.updateProfileImage = function(){
          console.log('update image');
          filepicker.pick(function(InkBlob){
            console.log(InkBlob.url);
            $scope.user.profile = InkBlob.url;
            $('#UserProfile').html("<img class='img-responsive' src='" + $scope.user.profile + "' />");
          });
        };
    }
]);