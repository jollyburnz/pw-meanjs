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
	name: {
		type: String,
		default: '',
		required: 'Please fill Investment name',
		trim: true
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