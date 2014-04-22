'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Fund = mongoose.model('Fund'),
	_ = require('lodash');

/**
 * Create a Fund
 */
exports.create = function(req, res) {
	var fund = new Fund(req.body);
	fund.user = req.user;

	fund.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				fund: fund
			});
		} else {
			res.jsonp(fund);
		}
	});
};

/**
 * Show the current Fund
 */
exports.read = function(req, res) {
	res.jsonp(req.fund);
};

/**
 * Update a Fund
 */
exports.update = function(req, res) {
	var fund = req.fund;

	fund = _.extend(fund, req.body);

	fund.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(fund);
		}
	});
};

/**
 * Delete an Fund
 */
exports.delete = function(req, res) {
	var fund = req.fund;

	fund.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(fund);
		}
	});
};

/**
 * List of Funds
 */
exports.list = function(req, res) {
	Fund.find().sort('-created').populate('user', 'displayName').exec(function(err, funds) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(funds);
		}
	});
};

/**
 * Fund middleware
 */
exports.fundByID = function(req, res, next, id) {
	Fund.findById(id).populate('user', 'displayName').exec(function(err, fund) {
		if (err) return next(err);
		if (!fund) return next(new Error('Failed to load Fund ' + id));
		req.fund = fund;
		next();
	});
};

/**
 * Fund authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fund.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};