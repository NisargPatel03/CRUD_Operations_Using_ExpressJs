var express = require('express');
const ProductModel = require('../models/Product');
var router = express.Router();
var mongoose = require('mongoose')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add-product', function(req, res, next) {
  res.render('add-product');
});

router.post('/add-product-process', function(req, res, next) {
  var productdata = {
    pname:req.body.txt1,
    pdetail:req.body.txt2,
    pprice:req.body.txt3
  }

  var mydata = ProductModel(productdata)
  mydata.save()
  .then(()=> res.send("Product Added Successfully!!!"))
  .catch((err) => res.send("Error in Product Adding!!!", err))
});

router.get('/display-product', function(req, res, next) {
  ProductModel.find()
  .then((mydata)=> {
    console.log(mydata)
    res.render('display-product', {mydata: mydata})
  })
  .catch((err)=> console.log(err))
});

router.get('/delete-product/:id', function(req, res, next) {
  var myid = req.params.id

  ProductModel.findByIdAndDelete(myid)
  .then(()=>{
    res.redirect('/display-product')
  })
  .catch((err)=> console.log(err))
});

router.get('/edit-product/:id', function(req, res, next) {
  var myid = req.params.id

  ProductModel.findById(myid)
  .then((mydata)=>{
    res.render('edit-product', {mydata: mydata})
    
  })
  .catch((err)=> console.log(err))
});

router.post('/update-product-process/:id', function(req, res, next) {
  var myid = req.params.id;

  var updatedData = {
    pname: req.body.txt1,
    pdetail: req.body.txt2,
    pprice: req.body.txt3
  };

  ProductModel.findByIdAndUpdate(myid, updatedData)
  .then(() => {
    res.redirect('/display-product');  // redirect back to product list
  })
  .catch((err) => {
    console.log(err);
    res.send("Error in Product Updating!!!");
  });
});


module.exports = router;
