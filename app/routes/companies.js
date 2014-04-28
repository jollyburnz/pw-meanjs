'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var companies = require('../../app/controllers/companies');

	// Companies Routes
	app.get('/companies', companies.list);
	app.post('/companies', users.requiresLogin, companies.create);
	app.get('/companies/:companyId', companies.read);
	app.put('/companies/:companyId', users.requiresLogin, companies.hasAuthorization, companies.update);
	app.del('/companies/:companyId', users.requiresLogin, companies.hasAuthorization, companies.delete);

	// Finish by binding the Company middleware
	app.param('companyId', companies.companyByID);
};