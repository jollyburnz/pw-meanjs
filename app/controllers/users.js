'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	_ = require('lodash'),
	fs = require('fs'),
	path = require('path'),
	async = require('async'),
	crypto = require('crypto'),
	nodemailer = require('nodemailer'),
	filesInQueue = [];

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Signup
 */
exports.signup = function(req, res) {
	// Init Variables
	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;

	user.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.send(400, err);
				} else {
					res.jsonp(user);
				}
			});
		}
	});
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.send(400, info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.send(400, err);
				} else {
					res.jsonp(user);
				}
			});
		}
	})(req, res, next);
};

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	if (user) {
		if (user.displayName === req.body.displayName){

			// Merge existing user
			user = _.extend(user, req.body);
			user.updated = Date.now();
			user.displayName = user.firstName + ' ' + user.lastName;

			user.save(function(err) {
				if (err) {
					console.log(err, 'err1');
					return res.send(400, {
						message: getErrorMessage(err)
					});
				} else {

					req.login(user, function(err) {
						if (err) {
							res.send(400, err);
						} else {
							res.jsonp(user);
						}
					});

          //LP INFO UPDATED -- SEND EMAIL!
          var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'SendGrid',
            auth: {
              user: '!!!',
              pass: '!!!'
            }
          });

          var mailOptions = {
            to: user.email,
            bcc: 'updates@scoutventures.com',
            from: 'updates@scoutventures.com',
            subject: 'Profile Updated',
            text: 'Your profile has been updated.\n\n' +
              'If you did not make any changes to your account, please contact us immediately.\n\n'
          };

          smtpTransport.sendMail(mailOptions, function(err) {
            console.log('EMAIL SENT');
          });

				}
			});

		} else {
			console.log('LP editing!!', req.body._id);
			User.findById(req.body._id, function(err, user){
				if(err){
					console.log(err, 'err');
				} else {
					var lp = user;
					lp = _.extend(lp, req.body);
					lp.updated = Date.now();
					lp.displayName = lp.firstName + ' ' + lp.lastName;
					lp.save(function(err) {
						if (err) {
							return res.send(400, {
								message: getErrorMessage(err)
							});
						} else {
							res.jsonp(lp);
						}
					});
				}
			});
		}
	} else {
		res.send(400, {
			message: 'User is not signed in'
		});
	}
};

/**
 * Change Password
 */
exports.changePassword = function(req, res, next) {
	// Init Variables
	var passwordDetails = req.body;
	var message = null;

	if (req.user) {
		User.findById(req.user.id, function(err, user) {
			if (!err && user) {
				if (user.authenticate(passwordDetails.currentPassword)) {
					if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
						user.password = passwordDetails.newPassword;

						user.save(function(err) {
							if (err) {
								return res.send(400, {
									message: getErrorMessage(err)
								});
							} else {
								req.login(user, function(err) {
									if (err) {
										res.send(400, err);
									} else {
										res.send({
											message: 'Password changed successfully'
										});
									}
								});
							}
						});
					} else {
						res.send(400, {
							message: 'Passwords do not match'
						});
					}
				} else {
					res.send(400, {
						message: 'Current password is incorrect'
					});
				}
			} else {
				res.send(400, {
					message: 'User is not found'
				});
			}
		});
	} else {
		res.send(400, {
			message: 'User is not signed in'
		});
	}
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

/**
 * Forgotten password
 */

exports.forgot =  function(req, res) {
  res.render('forgot', {
    user: req.user
  });
};

exports.forgot2 = function(req, res, next) {
	console.log('forgotPost');
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
        	console.log('ERROR');
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: '!!!',
          pass: '!!!'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'password@scoutventures.com',
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
      	console.log('EMAIL SENT');
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
};

/**
 * Forgotten reset
 */

exports.reset = function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
    	console.log('Password reset token is invalid or has expired');
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    console.log('reset!!!');
    res.render('reset', {
      user: req.user
    });
  });
};

exports.reset2 = function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
        	console.log('Password reset token is invalid or has expired.');
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          req.login(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: '!!!',
          pass: '!!!'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'password@scoutventures.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.jsonp(req.user || null);
};


/* List Users */

exports.list = function(req, res) {
	User.find().sort('-created').populate('user', 'displayName').exec(function(err, users) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(users);
		}
	});
};

/**
 * Download Files
 */ 
exports.getFiles = function(req, res) {
	console.log("\nClient requesting files\n");

	console.log("Request", req.params.user)

	User.findById(req.params.user, function(error, user){
		if(error){
			console.log("Error finding user");
		} else {
			var root_folder = user.root_folder;

			fs.readdir("public/Dropbox/4\ -\ Investors/" + root_folder, function(err, directory){
				if(err){
					console.log("Error", err);
				} else {
					console.log("Directory", directory);
					var file;
					var allFiles = []
					for(file in directory){
						//if file.isDirectory()
						var file_path = "public/Dropbox/4\ -\ Investors/" + root_folder + '/' + directory[file];
						file_path = path.resolve(file_path);
						var stat = fs.statSync(file_path);
						console.log("Stat", stat);
						var tuple = {path: file_path, id: "1234"}
						allFiles.push(tuple);
						filesInQueue[tuple.id] = file_path;
					}
					res.send({files: allFiles});
				}
			});

		}
	})


};

exports.download = function(req, res) {
	console.log("\nClient downloading files\n");

	console.log("req.params.id");

	res.download(filesInQueue[req.params.id], filesInQueue[req.params.id], function(err){
	  if (err) {
	    console.log("Error sending files", err);
	  } else {
	    console.log("Successfully sent file ", path);
	  }
	});
}

/**
 * OAuth callback
 */
exports.oauthCallback = function(strategy) {
	return function(req, res, next) {
		passport.authenticate(strategy, function(err, user, redirectURL) {
			if (err || !user) {
				return res.redirect('/#!/signin');
			}
			req.login(user, function(err) {
				if (err) {
					return res.redirect('/#!/signin');
				}

				return res.redirect(redirectURL || '/');
			});
		})(req, res, next);
	};
};

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.send(401, 'User is not logged in');
	}

	next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.profile.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}

	next();
};

/**
 * Helper function to save or update a OAuth user profile
 */
exports.saveOAuthUserProfile = function(req, providerUserProfile, done) {
	if (!req.user) {
		// Define a search query fields
		var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
		var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

		// Define main provider search query
		var mainProviderSearchQuery = {};
		mainProviderSearchQuery.provider = providerUserProfile.provider;
		mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

		// Define additional provider search query
		var additionalProviderSearchQuery = {};
		additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

		// Define a search query to find existing user with current provider profile
		var searchQuery = {
			$or: [mainProviderSearchQuery, additionalProviderSearchQuery]
		};

		User.findOne(searchQuery, function(err, user) {
			if (err) {
				return done(err);
			} else {
				if (!user) {
					var possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');

					User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
						user = new User({
							firstName: providerUserProfile.firstName,
							lastName: providerUserProfile.lastName,
							username: availableUsername,
							displayName: providerUserProfile.displayName,
							email: providerUserProfile.email,
							provider: providerUserProfile.provider,
							providerData: providerUserProfile.providerData
						});

						// And save the user
						user.save(function(err) {
							return done(err, user);
						});
					});
				} else {
					return done(err, user);
				}
			}
		});
	} else {
		// User is already logged in, join the provider data to the existing user
		User.findById(req.user.id, function(err, user) {
			if (err) {
				return done(err);
			} else {
				// Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
				if (user && user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
					// Add the provider data to the additional provider data field
					if (!user.additionalProvidersData) user.additionalProvidersData = {};
					user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;

					// Then tell mongoose that we've updated the additionalProvidersData field
					user.markModified('additionalProvidersData');

					// And save the user
					user.save(function(err) {
						return done(err, user, '/#!/settings/accounts');
					});
				} else {
					return done(err, user);
				}
			}
		});
	}
};

/**
 * Remove OAuth provider
 */
exports.removeOAuthProvider = function(req, res, next) {
	var user = req.user;
	var provider = req.param('provider');

	if (user && provider) {
		// Delete the additional provider
		if (user.additionalProvidersData[provider]) {
			delete user.additionalProvidersData[provider];
			
			// Then tell mongoose that we've updated the additionalProvidersData field
			user.markModified('additionalProvidersData');
		}

		user.save(function(err) {
			if (err) {
				return res.send(400, {
					message: getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.send(400, err);
					} else {
						res.jsonp(user);
					}
				});
			}
		});
	}
};
