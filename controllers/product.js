var express = require('express');
var router = express.Router();
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });
var cloudinary = require('cloudinary');


router.get('/', isLoggedIn, function(req, res) {
  db.product.findAll().then(function(products){
    res.render('product/index' ,{products : products});
  }).catch(function(err) {
    res.status(500).render('404');
  });
}); //View products

router.get('/:upc/edit',isLoggedIn, function(req, res){
  db.product.findOne({
    where:
    { upc: req.params.upc }
  }).then(function(product){
    res.render('product/edit',{product: product});
  }).catch(function(){
    req.flash('error','Unable to edit product');
    res.status(500).render('404');
  });
});

router.delete('/:upc', isLoggedIn, function(req,res){
  db.product.destroy({
    where:{
      upc: req.params.upc
    }
  }).then(db.product.findAll().then(function(products){
    res.render('product/index',{products : products});
  })).catch(function(){
    req.flash('error','Unable to delete product');
    res.status(500).render('404');
  })
}); //Delete product route

router.put('/:upc',isLoggedIn, function(req,res){
  db.product.findOne({
    where:
    { upc: req.params.upc }
  }).then(function(product) {
    if (product) {
      product.updateAttributes(req.body)
      res.send({msg: 'success'});
    } else {
      res.status(404).send({msg: 'error'});
    }
  }
);
}); // Edit product route

router.get('/new', isLoggedIn, function(req, res) {
  res.render('product/new');
});

router.post('/new',upload.single('picture'), function(req, res, next){
  cloudinary.uploader.upload(req.file.path, function(result) {
    req.imgPath = result.url;
    next()
  });
}) //How do i set it to upload image only after it has search the database and found that the entry does not exist?

router.post('/new',function(req, res){
  db.product.findOrCreate({
    where: { upc: req.body.upc.toLowerCase() },
    defaults: {
      name: req.body.name,
      category: req.body.category,
      cost: req.body.costPrice,
      sellingPrice: req.body.sellingPrice ,
      quantity: req.body.quantity,
      picture: req.imgPath,
      createdBy: res.locals.currentUser.email
    }
  }).spread(function(product, created){
    if(created){
      req.flash('success','Product created');
      res.redirect('/');
    } else {
      req.flash('error','Product already exists');
      res.redirect('/product/new');
    }
  }).catch(function(error) {
    req.flash('error', error.message);
    res.redirect('/product/new');
  });
}); //Add New Products

  module.exports = router;
