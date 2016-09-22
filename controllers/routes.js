var express = require('express');
var router = express.Router();
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var configAuth = require('../config/auth');
var cloudinary = require('cloudinary');

router.get('/',function(req,res){
  res.render('index');
});

router.get('/profile', isLoggedIn, function(req, res) {
  var fullDate = res.locals.currentUser.createdAt.toLocaleDateString();
  res.render('profile',{registration: fullDate});
});

module.exports = router;
