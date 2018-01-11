var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models');
var request = require('request');
var router = express.Router();

router.get('/', function (req, res){

	console.log(req.query.q);//this the data that was searched
	var discogsUrl = 'https://api.discogs.com/database/search?q=' + req.query.q + '&format=vinyl&key=' + process.env.CONSUMER_KEY + '&secret=' + process.env.CONSUMER_SECRET;
	// console.log(discogsUrl);
	request({url: discogsUrl, 
			headers: {
				'User-Agent':'MyDiscogsClient/1.0 +http://localhost:3000'
			}}, function(request, response, data){
		var searchResults = JSON.parse(data);
		// console.log(searchResults);

		// console.log(data);
		res.render("results", {data: searchResults});
	});
});

router.get('/results/:id', function(req, res){
	var albumUrl = "https://api.discogs.com/releases/" + req.params.id +"?key=dvEmUmAbqkYKrtHAyWvs&secret=gSCHQhTDPkwwyZVIscEGpUbmwQQFdbqW";
		request({url: albumUrl,
			headers: {
				'User-Agent':'MyDiscogsClient/1.0 +http://localhost:3000'
			}}, function(request, response, data){
				var albumResults = JSON.parse(data);
					console.log(data);
						res.render('album', {data: albumResults});

			})
});

router.post('/results/:id', function(req, res){
	db.album.create(req.body).then(function(createdAlbum){
		res.redirect('/search/results/'+ createdAlbum.discogsNum);
	}).catch(function(err){
		console.log('catch reached, but there was an error', err);
		res.status(500).send('uh oh');
	})
})













module.exports = router;