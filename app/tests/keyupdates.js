'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Keyupdate = mongoose.model('Keyupdate');

/**
 * Globals
 */
var user, keyupdate ;

/**
 * Unit tests
 */
describe('Keyupdate Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			keyupdate = new Keyupdate ({
				name: 'Keyupdate Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return keyupdate .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			keyupdate .name = '';

			return keyupdate .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Keyupdate .remove().exec();

		User.remove().exec();
		done();
	});
});