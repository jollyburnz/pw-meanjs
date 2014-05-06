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
	for_company: {
		type: Schema.ObjectId
	},
	date_added: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Article', ArticleSchema);