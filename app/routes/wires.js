'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var wires = require('../../app/controllers/wires');

	// Wires Routes
	app.get('/wires', wires.list);
	app.post('/wires', users.requiresLogin, wires.create);
	app.get('/wires/:wireId', wires.read);
	app.put('/wires/:wireId', users.requiresLogin, wires.hasAuthorization, wires.update);
	app.del('/wires/:wireId', users.requiresLogin, wires.hasAuthorization, wires.delete);

	// Finish by binding the Wire middleware
	app.param('wireId', wires.wireByID);
};