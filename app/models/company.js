'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Company Schema
 */
var CompanySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Company name',
		trim: true
	},
	image:{
		type: String
	},
	description:{
		type: String
	},
	initial_investment: {
		type: Number,
	},
	fund_ownership: {
		type: Number,
	},
	ev: {
		type: Number,
	},
	irr: {
		type: Number,
	},
	multiple: {
		type: Number,
	},
	d_cash: {
		type: Number,
	},
	d_ev: {
		type: Number,
	},
	d_multiple: {
		type: Number,
	},
	b_cash: {
		type: Number,
	},
	b_ev: {
		type: Number,
	},
	b_multiple: {
		type: Number,
	},
	u_cash: {
		type: Number,
	},
	u_ev: {
		type: Number,
	},
	u_multiple: {
		type: Number,
	},
	from_fund: {
		type: String
	},
	ceo_name: {
		type: String
	},
	ceo_email: {
		type: String
	},
	address1: {
		type: String
	},
	address2: {
		type: String
	},
	url: {
		type: String
	},
	is_featured: {
		type: Boolean,
		default: false
	},
	is_va: {
		type: Boolean,
		default: false
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

mongoose.model('Company', CompanySchema);