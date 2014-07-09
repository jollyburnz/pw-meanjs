'use strict';

// Setting up route
angular.module('core', ['dropbox']).config(['$stateProvider', '$urlRouterProvider', 'DropboxProvider',
	function($stateProvider, $urlRouterProvider, DropboxProvider) {

		DropboxProvider.config('dx74gcurbdaqzbr', 'http://localhost:4200/lib/ngDropbox/callback.html');

		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/users/views/settings/overview.html'
			//templateUrl: 'modules/core/views/home.html'
		});
	}
]);