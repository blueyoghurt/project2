var express = require('express');
var router = express.Router();
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req, res) {
  db.product.findAll().then(function(products){
    res.render('product/index' ,{products : products});
  }).catch(function(err) {
    res.status(500).render('404');
  });
}); //View products

router.get('/:upc/edit',isLoggedIn, function(req, res){
  console.log("in edit get route");
  db.product.findAll({
      where:
        { upc: req.params.upc }
  }).then(function(products){
    console.log(products);
    res.render('product/product_edit',{product: products});
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
  console.log("updating entries, server");
  console.log("req.body",req.body);
  db.product.findAll({
      where:
        { upc: req.params.upc }
  }).then(function(product) {
        if (product) {
          product[0].updateAttributes(req.body).then(function() {
            res.send({msg: 'success'});
          });
        } else {
          res.status(404).send({msg: 'error'});
        }
      }
  );
}); // Edit product route

router.get('/new', isLoggedIn, function(req, res) {
  res.render('product/product_new');
});

router.post('/new',function(req, res){
  db.product.findOrCreate({
    where: { upc: req.body.upc.toLowerCase() },
    defaults: {
      name: req.body.name,
      category: req.body.category,
      cost: req.body.costPrice,
      sellingPrice: req.body.sellingPrice ,
      quantity: req.body.quantity ,
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
