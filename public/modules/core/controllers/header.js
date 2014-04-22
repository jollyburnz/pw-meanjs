'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;

    $scope.menu = [{
      title: 'Home',
      link: '/',
      uiRoute: '/'
    },{
      title: 'Fund Test Page',
      link: 'fund',
      uiRoute: '/fund'
    },{
      title: 'Funds',
      link: 'funds',
      uiRoute: '/funds'
    }, {
      title: 'New Fund',
      link: 'funds/create',
      uiRoute: '/funds/create'
    }];

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
	}
]);