var express = require('express');
var discogs = require('disconnect').Client;
var passport = require('../config/passportConfiguration');
var db = require('../models');
var router = express.Router();


//establishing update route
router.get('/', function(req, res){
	res.render('update');
})

module.exports = router;