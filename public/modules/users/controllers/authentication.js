'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', '$window', 'Authentication',
    function($scope, $http, $location, $window, Authentication) {
        $scope.authentication = Authentication;

        $scope.signup = function() {
            $http.post('/auth/signup', $scope.credentials).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;

                //And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.signin = function() {
            $http.post('/auth/signin', $scope.credentials).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;

                //And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.forgot = function() {
            console.log('forgot', $scope.email);
            $http.post('/forgot', $scope.body).success(function(response) {
                //If successful we assign the response to the global user model
                console.log('success', $window.location); 
                //And redirect to the index page
                $window.location = '/';
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.reset = function() {
            //console.log('reset', $scope.body, $location, $location.absUrl().split('reset/')[1]);
            var token = $location.absUrl().split('reset/')[1];
            console.log('/forgot/'+token);
            $http.post('/reset/' + token, $scope.body).success(function(response) {
                //If successful we assign the response to the global user model
                console.log('success'); 
                //And redirect to the index page
                $window.location = '/';
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
    }
]);