'use strict';

//Setting up route
angular.module('wires').config(['$stateProvider',
	function($stateProvider) {
		// Wires state routing
		$stateProvider.
		state('listWires', {
			url: '/wires',
			templateUrl: 'modules/wires/views/list.html'
		}).
		state('createWire', {
			url: '/wires/create',
			templateUrl: 'modules/wires/views/create.html'
		}).
		state('viewWire', {
			url: '/wires/:wireId',
			templateUrl: 'modules/wires/views/view.html'
		}).
		state('editWire', {
			url: '/wires/:wireId/edit',
			templateUrl: 'modules/wires/views/edit.html'
		});
	}
]);