'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Update Schema
 */
var UpdateSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Update name',
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

mongoose.model('Update', UpdateSchema);