var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var passport = require('./config/ppConfig');
var session = require('express-session');
var flash = require('connect-flash');
var morgan = require('morgan');

app.use(session({
  secret: 'Super secrettttt',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine','ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static('static'));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

app.get('/', function(req, res) {
  if(res.locals.currentUser)
  {console.log(res.locals.currentUser.get());}
  res.render('index');
});

// initialize the passport configuration and session as middleware
app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
