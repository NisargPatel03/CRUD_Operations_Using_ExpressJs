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

router.get('/fileupload', function(req, res, next){
  res.render('fileupload-form');
})

router.post('/fileupload', function(req, res, next){
  console.log(req.files.file123)
  var myfile = req.files.file123
  myfile.mv('public/uploads/'+myfile.name, function(err){
    res.send("Done")
  })
})

router.get('/login', function(req, res, next){
  res.render('login')
})

router.post('/login', function(req, res, next){
  var a = req.body.txt1
  req.session.uname = a
  res.redirect('/dashboard')
})

router.get('/dashboard', function(req, res, next){
  if(req.session.uname){
    var a = req.session.uname
    res.render('dashboard', {mya : a})
  }else{
    res.redirect('/login')
  }
})

router.get('/logout', function(req, res, next){
  req.session.destroy()
  res.redirect('/login')
})

module.exports = router;
