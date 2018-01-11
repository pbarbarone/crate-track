var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res){
	res.send('profile reached');
})














module.exports = router;