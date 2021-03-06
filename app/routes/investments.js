'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var investments = require('../../app/controllers/investments');

	// Investments Routes
	app.get('/investments', investments.list);
	app.post('/investments', users.requiresLogin, investments.create);
	app.get('/investments/:investmentId', investments.read);
	app.put('/investments/:investmentId', investments.update);
	app.del('/investments/:investmentId', investments.delete);

	// Finish by binding the Investment middleware
	app.param('investmentId', investments.investmentByID);
};