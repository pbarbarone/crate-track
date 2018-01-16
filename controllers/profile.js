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
		include: [db.album]

		}).then(function(albumObject){
			res.render('profile', {data: albumObject});
		})
	});

router.delete('/:id', isLoggedIn, function(req, res){
  console.log(req.params.id);
  db.album.destroy({
    where: {id: req.params.id,
    		userId: req.user.id}
  }).then(function(deleted){
    console.log("deleted = ", deleted);
    res.send("success");
  }).catch(function(err){
    console.log("error happend", err);
    res.send("fail");
  });
});












module.exports = router;