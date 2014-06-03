'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Keyupdate = mongoose.model('Keyupdate'),
	_ = require('lodash');

/**
 * Create a Keyupdate
 */
exports.create = function(req, res) {
	var keyupdate = new Keyupdate(req.body);
	keyupdate.user = req.user;

	keyupdate.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				keyupdate: keyupdate
			});
		} else {
			res.jsonp(keyupdate);
		}
	});
};

/**
 * Show the current Keyupdate
 */
exports.read = function(req, res) {
	res.jsonp(req.keyupdate);
};

/**
 * Update a Keyupdate
 */
exports.update = function(req, res) {
	var keyupdate = req.keyupdate;

	keyupdate = _.extend(keyupdate, req.body);

	keyupdate.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(keyupdate);
		}
	});
};

/**
 * Delete an Keyupdate
 */
exports.delete = function(req, res) {
	var keyupdate = req.keyupdate;

	keyupdate.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(keyupdate);
		}
	});
};

/**
 * List of Keyupdates
 */
exports.list = function(req, res) {
	Keyupdate.find().sort('-created').populate('user', 'displayName').exec(function(err, keyupdates) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(keyupdates);
		}
	});
};

/**
 * Keyupdate middleware
 */
exports.keyupdateByID = function(req, res, next, id) {
	Keyupdate.findById(id).populate('user', 'displayName').exec(function(err, keyupdate) {
		if (err) return next(err);
		if (!keyupdate) return next(new Error('Failed to load Keyupdate ' + id));
		req.keyupdate = keyupdate;
		next();
	});
};

/**
 * Keyupdate authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.keyupdate.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};