var express = require('express');
var discogs = require('disconnect').Client;
var passport = require('../config/passportConfiguration');
var db = require('../models');
var router = express.Router();


//establishing update route
router.get('/', function(req, res){
	res.render('update');
})

//workshopping api module
// var dbtest = discogs().database();
// dbtest.getRelease(26764, function(err, data){
// 	var artistNames = data.artists.map(function(artist){
// 		return artist.name;
// 	})
// 	var trackNames=[];
// 	var allTracks = data.tracklist.forEach(function(tracklist){
// 		trackNames.push(tracklist.title);
// 		// console.log(trackNames);
// 	})
// 	console.log('mapped artist name', artistNames);
// 	console.log('album tracks', trackNames);
// 	console.log('album name', data.title);
// 	console.log('album ID', data.id);
// 	console.log(data.styles);

// });






module.exports = router;