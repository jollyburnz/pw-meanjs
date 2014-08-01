'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var articles = require('../../app/controllers/articles');

	// Articles Routes
	app.get('/articles', articles.list);
	app.post('/articles', users.requiresLogin, articles.create);
	app.get('/articles/:articleId', articles.read);
	app.put('/articles/:articleId', articles.update);
	app.del('/articles/:articleId', articles.delete);

	// Finish by binding the Article middleware
	app.param('articleId', articles.articleByID);
};