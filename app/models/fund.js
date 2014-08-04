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
	d_mark: {
		type: Number,
	},
	d_IRR: {
		type: Number,
	},
	d_multiple: {
		type: Number,
	},
	b_mark: {
		type: Number,
	},
	b_IRR: {
		type: Number,
	},
	b_multiple: {
		type: Number,
	},
	u_mark: {
		type: Number,
	},
	u_IRR: {
		type: Number,
	},
	u_multiple: {
		type: Number,
	},
	updated: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Fund', FundSchema);