'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var updates = require('../../app/controllers/updates');

	// Updates Routes
	app.get('/updates', updates.list);
	app.post('/updates', users.requiresLogin, updates.create);
	app.get('/updates/:updateId', updates.read);
	app.put('/updates/:updateId', users.requiresLogin, updates.hasAuthorization, updates.update);
	app.del('/updates/:updateId', users.requiresLogin, updates.hasAuthorization, updates.delete);

	// Finish by binding the Update middleware
	app.param('updateId', updates.updateByID);
};