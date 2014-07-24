'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Investment Schema
 */
var InvestmentSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
	amount: {
		type: Number,
	},
	for_company: {
		type: Object
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Investment', InvestmentSchema);