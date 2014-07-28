'use strict';

//Setting up route
angular.module('partners').config(['$stateProvider',
	function($stateProvider) {
		// Partners state routing
		$stateProvider.
		state('listPartners', {
			url: '/partners',
			templateUrl: 'modules/partners/views/list.html'
		}).
		state('createPartner', {
			url: '/partners/create',
			templateUrl: 'modules/partners/views/create.html'
		}).
		state('viewPartner', {
			url: '/partners/:partnerId',
			templateUrl: 'modules/partners/views/view.html'
		}).
		state('editPartner', {
			url: '/partners/:partnerId/edit',
			templateUrl: 'modules/partners/views/edit.html'
		});
	}
]);