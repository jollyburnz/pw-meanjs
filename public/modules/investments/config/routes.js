'use strict';

//Setting up route
angular.module('investments').config(['$stateProvider',
	function($stateProvider) {
		// Investments state routing
		$stateProvider.
		state('listInvestments', {
			url: '/investments',
			templateUrl: 'modules/investments/views/list.html'
		}).
		state('createInvestment', {
			url: '/investments/create',
			templateUrl: 'modules/investments/views/create.html'
		}).
		state('viewInvestment', {
			url: '/investments/:investmentId',
			templateUrl: 'modules/investments/views/view.html'
		}).
		state('editInvestment', {
			url: '/investments/:investmentId/edit',
			templateUrl: 'modules/investments/views/edit.html'
		});
	}
]);