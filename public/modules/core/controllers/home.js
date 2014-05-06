'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Companies', 'Articles',
  function ($scope, Authentication, Companies, Articles) {
    $scope.authentication = Authentication;

    Companies.query(function(companies) {
      $scope.companies = companies;
    });

    Articles.query(function(articles) {
      $scope.articles = articles;
    });

}]);