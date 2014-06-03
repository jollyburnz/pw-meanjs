'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Keyupdate Schema
 */
var KeyupdateSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Keyupdate name',
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

mongoose.model('Keyupdate', KeyupdateSchema);