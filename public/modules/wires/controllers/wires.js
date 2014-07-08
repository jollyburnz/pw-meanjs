'use strict';

// Wires controller
angular.module('wires').controller('WiresController', ['$scope', '$stateParams', '$location', 'Authentication', 'Wires', 'Funds', 'Users',
    function($scope, $stateParams, $location, Authentication, Wires, Funds, Users) {
        $scope.authentication = Authentication;

        Users.query(function(users) {
          console.log(users, 'users');
          $scope.users = users;
        });

        Funds.query(function(funds){
            console.log(funds, 'funds');
            $scope.funds = funds;
        });

        // Create new Wire
        $scope.create = function() {
        	// Create new Wire object
            var wire = new Wires({
                fund: this.fund,
                lp: this.lp,
                date: this.date,
                amount: this.amount
            });

            // Redirect after save
            wire.$save(function(response) {
                $location.path('wires/' + response._id);
            });

            // Clear form fields
            this.fund = '';
            this.lp = '';
            this.date = '';
            this.amount = '';
        };

        // Remove existing Wire
        $scope.remove = function(wire) {
            if (wire) {
                wire.$remove();

                for (var i in $scope.wires) {
                    if ($scope.wires[i] === wire) {
                        $scope.wires.splice(i, 1);
                    }
                }
            } else {
                $scope.wire.$remove(function() {
                    $location.path('wires');
                });
            }
        };

        // Update existing Wire
        $scope.update = function() {
            var wire = $scope.wire;

            wire.$update(function() {
                $location.path('wires/' + wire._id);
            });
        };

        // Find a list of Wires
        $scope.find = function() {
            Wires.query(function(wires) {
                $scope.wires = wires;
            });
        };

        // Find existing Wire
        $scope.findOne = function() {
            Wires.get({
                wireId: $stateParams.wireId
            }, function(wire) {
                $scope.wire = wire;
            });
        };
    }
]);