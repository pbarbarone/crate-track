var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	db.user.findById(id).then(function(user){
		callback(null, user);
	}).catch(function(err){
		callback(err, null);
	});
});

passport.use(new localStrategy({
	usernameField: 'email', //assumes usner is default login field,
	passwordField: 'password'
}, function(email,password, callback){
	db.user.findOne({
		where: { email: email } //where email is what we passed in/what was typed
	}).then(function(user){ //if user is found by their email...
		if(!user || !user.isValidPassword(password)){ //if user is not found by email
			callback(null, false);
		} 
		else { //if user valid and the user has correct PW
			callback(null,user);
		}
	}).catch(function(err){
		callback(err, null);
	})
}));

module.exports = passport;