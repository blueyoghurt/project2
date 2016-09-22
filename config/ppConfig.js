var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');


/*
 * Passport "serializes" objects to make them easy to store, converting the
 * user to an identifier (id)
 */
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

/*
 * Passport "deserializes" objects by taking the user's serialization (id)
 * and looking it up in the database
 */
passport.deserializeUser(function(id, cb) {
  db.user.findById(id).then(function(user) {
    cb(null, user);
  }).catch(cb);
});

/*
 * This is Passport's strategy to provide local authentication. We provide the
 * following information to the LocalStrategy:
 *
 * Configuration: An object of data to identify our authentication fields, the
 * username and password
 *
 * Callback function: A function that's called to log the user in. We can pass
 * the email and password to a database query, and return the appropriate
 * information in the callback. Think of "cb" as a function that'll later look
 * like this:
 *
 * login(error, user) {
 *   // do stuff
 * }
 *
 * We need to provide the error as the first argument, and the user as the
 * second argument. We can provide "null" if there's no error, or "false" if
 * there's no user.
 */
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  db.user.find({
    where: { email: email.toLowerCase() }
  }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));

// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
passport.use(new FacebookStrategy({

  // pull in our app id and secret from our auth.js file
  clientID        : configAuth.facebookAuth.clientID,
  clientSecret    : configAuth.facebookAuth.clientSecret,
  callbackURL     : configAuth.facebookAuth.callbackURL,
  profileFields   : ['displayName','email','picture.type(large)'],
  enableProof     : true
},
function(accessToken, refreshToken, profile, done) {
console.log(profile);
console.log(profile._json.picture);
  process.nextTick(function () {

        db.user.findOrCreate({ where: { facebookid: profile._json.id },
            defaults: {
              name: profile.displayName,
              email: profile._json.email,
              password: profile._json.id,
              facebookid: profile._json.id,
              avatar: profile._json.picture.data.url,
              facebooktoken: accessToken,
              facebook:true
          }})
          .spread(function(user, created) {
            if (created == true) {
              console.log(user.name + ' was created at - ' + created)
            } else {
              console.log(user.name + ' already exists')
            }
            return done(null, user)
          })
  })
}));

// facebook will send back the token and profile
// export the Passport configuration from this module
module.exports = passport;
