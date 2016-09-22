var express = require('express');
var router = express.Router();
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var configAuth = require('../config/auth');
var cloudinary = require('cloudinary');
//var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });

router.get('/',function(req,res){
  res.render('index');
});

router.get('/profile', isLoggedIn, function(req, res) {
  var fullDate = res.locals.currentUser.createdAt.toLocaleDateString();
  res.render('profile',{registration: fullDate});
});

// router.post('/upload', function(req, res){
//   var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary' })
//     , cloudStream = cloudinary.uploader.upload_stream(function() { res.redirect('/'); });
//
//   imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
// });

module.exports = router;
