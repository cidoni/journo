var express = require('express');
var router = express.Router();

/* GET user list page */
router.get('/userlist',function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

/* GET new user page */
router.get('/newuser',function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(err,docs){
		res.render('newuser', {
			"userlist" : docs,
			title: 'Add a new user'
		});
	});
});

/* POST add user page */
router.post('/adduser',function(req, res){
	var db = req.db;
	
	// Get our form values. These rely on the "name" attributes
	var username = req.body.username;
	var useremail = req.body.useremail;
	
	var collection = db.get('usercollection');
	
	collection.insert({"username":username,"email":useremail},function(err,docs){
		if (err) {
			// If it failed, return error
            res.send("There was a problem adding the information to the database.");
		} else {
			collection.find({},{},function(err,docs){
				res.render('newuser', {
					"userlist" : docs,
					title: 'Add a new user'
				});
			});
		}
	});
});

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


module.exports = router;
