var express = require('express');
var passport = require('../config/passportConfiguration');
var db = require('../models');
var router = express.Router();


router.get('/', function(req, res){
	res.send('here you will search/upload albums to your library');
})









module.exports = router;