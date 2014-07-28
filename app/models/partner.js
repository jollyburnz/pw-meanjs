'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Partner Schema
 */
var PartnerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Partner name',
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

mongoose.model('Partner', PartnerSchema);