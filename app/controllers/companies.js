'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Company = mongoose.model('Company'),
	_ = require('lodash');

/**
 * Create a Company
 */
exports.create = function(req, res) {
	var company = new Company(req.body);
	company.user = req.user;

	company.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				company: company
			});
		} else {
			res.jsonp(company);
		}
	});
};

/**
 * Show the current Company
 */
exports.read = function(req, res) {
	res.jsonp(req.company);
};

/**
 * Update a Company
 */
exports.update = function(req, res) {
	var company = req.company;

	company = _.extend(company, req.body);

	company.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(company);
		}
	});
};

/**
 * Delete an Company
 */
exports.delete = function(req, res) {
	var company = req.company;

	company.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(company);
		}
	});
};

/**
 * List of Companies
 */
exports.list = function(req, res) {
	Company.find().sort('-created').populate('user', 'displayName').exec(function(err, companies) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(companies);
		}
	});
};

/**
 * Company middleware
 */
exports.companyByID = function(req, res, next, id) {
	Company.findById(id).populate('user', 'displayName').exec(function(err, company) {
		if (err) return next(err);
		if (!company) return next(new Error('Failed to load Company ' + id));
		req.company = company;
		next();
	});
};

/**
 * Company authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.company.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};