var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models');
var request = require('request');
var router = express.Router();

router.get('/', function (req, res){
	var discogsUrl = 'https://api.discogs.com/database/search?q=&type=release&format=vinyl&release_title=' + req.query.q  + '&artist=' + req.query.a + '&catno=' + req.query.c + '&year=' + req.query.y + '&barcode=' + req.query.s + '&key=' + process.env.CONSUMER_KEY + '&secret=' + process.env.CONSUMER_SECRET;
	request({url: discogsUrl, 
			headers: {
				'User-Agent':'MyDiscogsClient/1.0 +http://localhost:3000'
			}}, function(request, response, data){
		var searchResults = JSON.parse(data);

		res.render("results", {data: searchResults});
	});
});

router.post('/', function(req, res){
	var nextPage = req.body.nextUrl;
	console.log(req.body.nextUrl);
	request ({url: nextPage,
			headers: {
				'User-Agent':'MyDiscogsClient/1.0 +http://localhost:3000'				
			}}, function(request, response, data){
		var searchResults = JSON.parse(data);
		res.render('results', {data: searchResults});
	});
});

router.get('/results/:id', function(req, res){
	var albumUrl = "https://api.discogs.com/releases/" + req.params.id +"?key=" + process.env.CONSUMER_KEY + "&secret=" + process.env.CONSUMER_SECRET;
		request({url: albumUrl,
			headers: {
				'User-Agent':'MyDiscogsClient/1.0 +http://localhost:3000'
			}}, function(request, response, data){
				var albumResults = JSON.parse(data);
						res.render('album', {data: albumResults});

			});
});

router.post('/results/:id', function(req, res){
	console.log(req.user);
	req.body.userId = req.user.id;

	db.album.create(req.body).then(function(createdAlbum){
		// res.redirect('/search/results/'+ createdAlbum.discogsNum);
		res.redirect('/profile')
	}).catch(function(err){
		// console.log('catch reached, but there was an error', err);
		res.status(500).send('uh oh');
	});
});













module.exports = router;