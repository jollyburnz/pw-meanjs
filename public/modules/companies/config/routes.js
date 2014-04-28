'use strict';

//Setting up route
angular.module('companies').config(['$stateProvider',
	function($stateProvider) {
		// Companies state routing
		$stateProvider.
		state('listCompanies', {
			url: '/companies',
			templateUrl: 'modules/companies/views/list.html'
		}).
		state('createCompany', {
			url: '/companies/create',
			templateUrl: 'modules/companies/views/create.html'
		}).
		state('viewCompany', {
			url: '/companies/:companyId',
			templateUrl: 'modules/companies/views/view.html'
		}).
		state('editCompany', {
			url: '/companies/:companyId/edit',
			templateUrl: 'modules/companies/views/edit.html'
		});
	}
]);