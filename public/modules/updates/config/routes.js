'use strict';

//Setting up route
angular.module('updates').config(['$stateProvider',
	function($stateProvider) {
		// Updates state routing
		$stateProvider.
		state('listUpdates', {
			url: '/updates',
			templateUrl: 'modules/updates/views/list.html'
		}).
		state('createUpdate', {
			url: '/updates/create',
			templateUrl: 'modules/updates/views/create.html'
		}).
		state('viewUpdate', {
			url: '/updates/:updateId',
			templateUrl: 'modules/updates/views/view.html'
		}).
		state('editUpdate', {
			url: '/updates/:updateId/edit',
			templateUrl: 'modules/updates/views/edit.html'
		});
	}
]);