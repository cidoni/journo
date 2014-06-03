var express = require('express');
var usercontroller = express.Router();

/* GET user list page */
usercontroller.get('/userlist',function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

/* GET new user page */
usercontroller.get('/newuser',function(req, res){
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
usercontroller.post('/adduser',function(req, res){
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
			res.location("newuser");
			res.redirect("newuser");
		}
	});
});

module.exports = usercontroller;
