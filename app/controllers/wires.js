'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Wire = mongoose.model('Wire'),
	_ = require('lodash');

/**
 * Create a Wire
 */
exports.create = function(req, res) {
	var wire = new Wire(req.body);
	wire.user = req.user;

	wire.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				wire: wire
			});
		} else {
			res.jsonp(wire);
		}
	});
};

/**
 * Show the current Wire
 */
exports.read = function(req, res) {
	res.jsonp(req.wire);
};

/**
 * Update a Wire
 */
exports.update = function(req, res) {
	var wire = req.wire;

	wire = _.extend(wire, req.body);

	wire.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(wire);
		}
	});
};

/**
 * Delete an Wire
 */
exports.delete = function(req, res) {
	var wire = req.wire;

	wire.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(wire);
		}
	});
};

/**
 * List of Wires
 */
exports.list = function(req, res) {
	Wire.find().sort('-created').populate('user', 'displayName').exec(function(err, wires) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(wires);
		}
	});
};

/**
 * Wire middleware
 */
exports.wireByID = function(req, res, next, id) {
	Wire.findById(id).populate('user', 'displayName').exec(function(err, wire) {
		if (err) return next(err);
		if (!wire) return next(new Error('Failed to load Wire ' + id));
		req.wire = wire;
		next();
	});
};

/**
 * Wire authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.wire.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};