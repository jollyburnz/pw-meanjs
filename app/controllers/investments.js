'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Investment = mongoose.model('Investment'),
	_ = require('lodash');

/**
 * Create a Investment
 */
exports.create = function(req, res) {
	var investment = new Investment(req.body);
	investment.user = req.user;

	investment.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				investment: investment
			});
		} else {
			res.jsonp(investment);
		}
	});
};

/**
 * Show the current Investment
 */
exports.read = function(req, res) {
	res.jsonp(req.investment);
};

/**
 * Update a Investment
 */
exports.update = function(req, res) {
	var investment = req.investment;

	investment = _.extend(investment, req.body);

	investment.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(investment);
		}
	});
};

/**
 * Delete an Investment
 */
exports.delete = function(req, res) {
	var investment = req.investment;

	investment.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(investment);
		}
	});
};

/**
 * List of Investments
 */
exports.list = function(req, res) {
	Investment.find().sort('-created').populate('user', 'displayName').exec(function(err, investments) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(investments);
		}
	});
};

/**
 * Investment middleware
 */
exports.investmentByID = function(req, res, next, id) {
	Investment.findById(id).populate('user', 'displayName').exec(function(err, investment) {
		if (err) return next(err);
		if (!investment) return next(new Error('Failed to load Investment ' + id));
		req.investment = investment;
		next();
	});
};

/**
 * Investment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.investment.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};