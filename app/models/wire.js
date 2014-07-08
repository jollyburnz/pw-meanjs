'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Wire Schema
 */
var WireSchema = new Schema({
	fund: {
		type: Schema.ObjectId
	},
	lp: {
		type: Schema.ObjectId
	},
	date: {
		type: Date,
		default: Date.now
	},
	amount: {
		type: Number
	}
});

mongoose.model('Wire', WireSchema);