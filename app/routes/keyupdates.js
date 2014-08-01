'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var keyupdates = require('../../app/controllers/keyupdates');

	// Keyupdates Routes
	app.get('/keyupdates', keyupdates.list);
	app.post('/keyupdates', users.requiresLogin, keyupdates.create);
	app.get('/keyupdates/:keyupdateId', keyupdates.read);
	app.put('/keyupdates/:keyupdateId', keyupdates.update);
	app.del('/keyupdates/:keyupdateId', keyupdates.delete);

	// Finish by binding the Keyupdate middleware
	app.param('keyupdateId', keyupdates.keyupdateByID);
};