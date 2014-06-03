'use strict';

// Updates controller
angular.module('updates').controller('UpdatesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Updates',
    function($scope, $stateParams, $location, Authentication, Updates) {
        $scope.authentication = Authentication;

        // Create new Update
        $scope.create = function() {
        	// Create new Update object
            var update = new Updates({
                name: this.name
            });

            // Redirect after save
            update.$save(function(response) {
                $location.path('updates/' + response._id);
            });

            // Clear form fields
            this.name = '';
        };

        // Remove existing Update
        $scope.remove = function(update) {
            if (update) {
                update.$remove();

                for (var i in $scope.updates) {
                    if ($scope.updates[i] === update) {
                        $scope.updates.splice(i, 1);
                    }
                }
            } else {
                $scope.update.$remove(function() {
                    $location.path('updates');
                });
            }
        };

        // Update existing Update
        $scope.update = function() {
            var update = $scope.update;

            update.$update(function() {
                $location.path('updates/' + update._id);
            });
        };

        // Find a list of Updates
        $scope.find = function() {
            Updates.query(function(updates) {
                $scope.updates = updates;
            });
        };

        // Find existing Update
        $scope.findOne = function() {
            Updates.get({
                updateId: $stateParams.updateId
            }, function(update) {
                $scope.update = update;
            });
        };
    }
]);