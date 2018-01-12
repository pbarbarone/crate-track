var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var passport = require('../config/passportConfiguration');
var session = require('express-session');
var request = require('request');
var router = express.Router();

router.get('/', isLoggedIn, function(req,res){
	db.user.findOne({
		where: {id: req.user.id},
		// "eager loading" db info ahead of time
		include: [db.album]
	// }).then(function(user){
	// 	db.album.find({
	// 		where:{userId: user.id}
		}).then(function(albumObject){
			console.log(albumObject, "############");
			res.render('profile', {data: albumObject});
		})
	});
// });















module.exports = router;