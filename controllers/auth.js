var express = require('express');
var passport = require('../config/passportConfiguration');
var db = require('../models');
var router = express.Router();


router.get('/login', function (req,res){
	res.render('auth/login');
});

// post router where login form info is obtained
// test route first!
router.post('/login', passport.authenticate('local',{
	successRedirect: '/profile', 
	successFlash: 'Login Approved',
	failureRedirect: '/auth/login',
	failureFlash: 'Invalid Login'
}));

router.get('/signup', function (req,res){
	res.render('auth/signup');
});

router.post('/signup', function(req,res, next){
	db.user.findOrCreate({
		where: { email: req.body.email },
		defaults: {
			username: req.body.username,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			password: req.body.password
		}
	}).spread(function(user, wasCreated){
		if(wasCreated){
			//Good job, no dupe!
			passport.authenticate('local', {
				successRedirect: '/profile',
				successFlash: 'Successfully logged in'
			})(req, res, next);
		}
		else{
			//you got duped! bad job!
			req.flash('error','Email already exists'); //takes two args; what kind of message? what does it say?
			res.redirect('/auth/login');
		}
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/auth/signup');
	})
});

router.get('/logout', function (req,res){
	req.logout();
	req.flash('success', 'Successfully logged out');
	res.redirect('/');	
});













module.exports = router;