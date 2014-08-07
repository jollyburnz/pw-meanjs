'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	image: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	link: {
		type: String,
		default: '',
		trim: true
	},
	author: {
		type: String,
		default: '',
		trim: true
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	is_keyupdate: {
		type: Boolean,
		default: false
	},
	for_company: {
		type: Object
	},
	date_posted: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Article', ArticleSchema);