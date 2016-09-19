var express = require('express');
var router = express.Router();
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req, res) {
 res.render('product/product');
});

router.get('/new', isLoggedIn, function(req, res) {
 res.render('product/product_new');
});

router.post('/new',function(e){
  console.log(req.body);
});

module.exports = router;
