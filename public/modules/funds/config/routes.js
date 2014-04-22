'use strict';

//Setting up route
angular.module('funds').config(['$stateProvider',
	function($stateProvider) {
		// Funds state routing
		$stateProvider.
		state('listFunds', {
			url: '/funds',
			templateUrl: 'modules/funds/views/list.html'
		}).
		state('createFund', {
			url: '/funds/create',
			templateUrl: 'modules/funds/views/create.html'
		}).
		state('viewFund', {
			url: '/funds/:fundId',
			templateUrl: 'modules/funds/views/view.html'
		}).
		state('editFund', {
			url: '/funds/:fundId/edit',
			templateUrl: 'modules/funds/views/edit.html'
		});
	}
]);