var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/ppConfig');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'Welcome back!'
}), function(req, res) {
  currentUser = req.user
});

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email.toLowerCase() },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'See you later alligator');
  res.redirect('/');
});

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/facebook', passport.authenticate('facebook', { authType: 'rerequest', scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
passport.authenticate('facebook', {
  successFlash: 'Welcome back!',
  successRedirect : '/profile',
  failureFlash: 'Invalid username and/or password',
  failureRedirect : '/'
}),function(req,res){
  res.redirect('/profile');
});

module.exports = router;
