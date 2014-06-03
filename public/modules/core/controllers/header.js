'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;

    // $scope.menu = [{
    //   title: 'Home',
    //   link: 'settings/accounts',
    //   uiRoute: '/settings/accounts'
    // },{
    //   title: 'Fund Test Page',
    //   link: 'fund',
    //   uiRoute: '/fund'
    // },{
    //   title: 'Funds',
    //   link: 'funds',
    //   uiRoute: '/funds'
    // }, {
    //   title: 'New Fund',
    //   link: 'funds/create',
    //   uiRoute: '/funds/create'
    // },{
    //   title: 'Companies',
    //   link: 'companies',
    //   uiRoute: '/companies'
    // }, {
    //   title: 'New Company',
    //   link: 'companies/create',
    //   uiRoute: '/companies/create'
    // },{
    //   title: 'Articles',
    //   link: 'articles',
    //   uiRoute: '/articles'
    // }, {
    //   title: 'New Article',
    //   link: 'articles/create',
    //   uiRoute: '/articles/create'
    // }];


		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
	}
]);