'use strict';

//Setting up route
angular.module('keyupdates').config(['$stateProvider',
	function($stateProvider) {
		// Keyupdates state routing
		$stateProvider.
		state('listKeyupdates', {
			url: '/keyupdates',
			templateUrl: 'modules/keyupdates/views/list.html'
		}).
		state('createKeyupdate', {
			url: '/keyupdates/create',
			templateUrl: 'modules/keyupdates/views/create.html'
		}).
		state('viewKeyupdate', {
			url: '/keyupdates/:keyupdateId',
			templateUrl: 'modules/keyupdates/views/view.html'
		}).
		state('editKeyupdate', {
			url: '/keyupdates/:keyupdateId/edit',
			templateUrl: 'modules/keyupdates/views/edit.html'
		});
	}
]);