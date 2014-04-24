'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Fund Schema
 */
var FundSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Fund name',
		trim: true
	},
	investedCapital: {
		type: Number,
	},
	mark: {
		type: Number,
	},
	IRR: {
		type: Number,
	},
	multiple: {
		type: Number,
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

mongoose.model('Fund', FundSchema);