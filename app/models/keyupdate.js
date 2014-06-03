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
	keyupdate: {
		type: String,
		default: '',
		required: 'Please fill Key update name',
		trim: true
	},
	company: {
		type: Schema.ObjectId
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