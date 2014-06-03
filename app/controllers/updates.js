'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Update = mongoose.model('Update'),
	_ = require('lodash');

/**
 * Create a Update
 */
exports.create = function(req, res) {
	var update = new Update(req.body);
	update.user = req.user;

	update.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				update: update
			});
		} else {
			res.jsonp(update);
		}
	});
};

/**
 * Show the current Update
 */
exports.read = function(req, res) {
	res.jsonp(req.update);
};

/**
 * Update a Update
 */
exports.update = function(req, res) {
	var update = req.update;

	update = _.extend(update, req.body);

	update.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(update);
		}
	});
};

/**
 * Delete an Update
 */
exports.delete = function(req, res) {
	var update = req.update;

	update.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(update);
		}
	});
};

/**
 * List of Updates
 */
exports.list = function(req, res) {
	Update.find().sort('-created').populate('user', 'displayName').exec(function(err, updates) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(updates);
		}
	});
};

/**
 * Update middleware
 */
exports.updateByID = function(req, res, next, id) {
	Update.findById(id).populate('user', 'displayName').exec(function(err, update) {
		if (err) return next(err);
		if (!update) return next(new Error('Failed to load Update ' + id));
		req.update = update;
		next();
	});
};

/**
 * Update authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.update.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};