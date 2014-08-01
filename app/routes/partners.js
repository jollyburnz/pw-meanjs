'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var partners = require('../../app/controllers/partners');

	// Partners Routes
	app.get('/partners', partners.list);
	app.post('/partners', users.requiresLogin, partners.create);
	app.get('/partners/:partnerId', partners.read);
	app.put('/partners/:partnerId', partners.update);
	app.del('/partners/:partnerId', partners.delete);

	// Finish by binding the Partner middleware
	app.param('partnerId', partners.partnerByID);
};