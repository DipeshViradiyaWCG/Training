var express = require('express');
var router = express.Router();

var UsersModel=require('../model/usermodel');
var AdminModel = require('../model/admin');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Get all data */
router.get('/show-users',function(req,res,next){
  UsersModel.find({},function(err,mydata){
    if(err){
      res.send(JSON.stringify({"err":err}));
    }else{
      
      res.send(JSON.stringify({"data":mydata}));
    }
  });
});

/*Get single data by id */
router.get('/show-user/:id',function(req,res,next){
  UsersModel.findById(req.params.id,function(err,mydata){
    if(err){
      res.send(JSON.stringify({"err":err}));
    }else{
      res.send(JSON.stringify({"data":mydata}));
    }
  });
});


//add all data
router.post('/add-user',function(req,res,next){
  console.log(req.body);
  const mybodydata ={
    user_name:req.body.user_name,
    user_email:req.body.user_email
  }
  var data =UsersModel(mybodydata);
  data.save(function(err){
    if(err){
      res.send(JSON.stringify({"err":err}));
    }else{
      res.send(JSON.stringify({"message":"record added"}));
    }
  })
});

//delete data  by id
router.delete('/delete-user', function(req, res, next) {
  UsersModel.findByIdAndRemove(req.body._id,function(err,post){
    if(err){
      res.send(JSON.stringify({"err":err}));
    }else{
      res.send(JSON.stringify({"message":"data deleted"}));
    }
  });
});

//update data by id
router.put("/update-user/:id",function(req,res,next){
  console.log(req.params.id);
  UsersModel.findByIdAndUpdate(req.params.id,req.body,function(err,post){
  
    if(err){
      res.send(JSON.stringify({"err":err}));
    }else{
      res.send(JSON.stringify({"message":"data updated"}));
    }
  });
});


module.exports = router;