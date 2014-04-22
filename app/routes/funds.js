'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var funds = require('../../app/controllers/funds');

	// Funds Routes
	app.get('/funds', funds.list);
	app.post('/funds', users.requiresLogin, funds.create);
	app.get('/funds/:fundId', funds.read);
	app.put('/funds/:fundId', users.requiresLogin, funds.hasAuthorization, funds.update);
	app.del('/funds/:fundId', users.requiresLogin, funds.hasAuthorization, funds.delete);

	// Finish by binding the Fund middleware
	app.param('fundId', funds.fundByID);
};