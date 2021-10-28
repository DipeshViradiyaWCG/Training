var express = require('express');
var router = express.Router();

//DB model
var UserModel = require("../models/user_model");
let mongoPracticeModel = require("../models/playground");

/* GET home page. */
router.get('/', function(req, res, next) {
  UserModel.find((err, data) => {
    if(err)
      throw err;
    else{
      res.render('index', {fetched_user_data : data});
    }
  }).lean();
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add', function(req, res, next) {
  const user_data = {
    user_name : req.body.name.trim() ,
    user_mobile : req.body.mobile
  }
  var temp_data = UserModel(user_data);
  temp_data.save(function (err) {
    if (err)
      throw err;
    else {
      console.log("Record added...");
      res.render('add');
    }
  });
});

router.get('/delete/:id', function(req, res, next) {
  UserModel.findByIdAndDelete(req.params.id, (err, data) => {
    if(err)
      throw err;
    else {
      console.log("Record deleted...");
      res.redirect('/');
    }
  })
  res.render('add');
});

router.get('/edit/:id', function(req, res, next) {
  UserModel.find({_id : req.params.id}, (err, editdata) => {
    if (err)
      throw err;
    else {
      console.log(editdata[0]);
      res.render('edit', {edit_data : editdata[0]});
    }
  }).lean();
});

router.post('/edit/:id', function(req, res, next) {
  const user_data = {
    user_name : req.body.name.trim() ,
    user_mobile : req.body.mobile
  }

  UserModel.findByIdAndUpdate(req.params.id, user_data, (err, data) => {
    if (err)
      throw err;
    else{
      console.log("Record updated...");
      res.redirect('/');

    }
  });

  // var temp_data = UserModel(user_data);
  // temp_data.save(function (err) {
  //   if (err)
  //     throw err;
  //   else {
  //     console.log("Record updated...");
  //     res.redirect('/');
  //   }
  // }).lean();
});

router.get("/testschema", async () => {
  let obj1 = {
    name : "Dipesh",
    age : 21,
    // mixDataObject :,
    mixDataObject : [
        {
          height : 170,
          games : ["cricket", "football", { winner : [true, false] }],
          tournaments : [
            {
              place : "Ahmedabad",
              date : "01-01-2020"
            },
            {
              place : "Surat",
              date : "01-01-2020"
            },
            {
              place : "Ahmedabad",
              date : "01-01-2021"
            }
          ]
        },
        {
          weight : "dont ask",
          winnerPrediction : [true, false, "not decided", false, true]
        },
        ["1", "2", "3"]
      ],
      demo : "demoentry"
  };

  try {
    await mongoPracticeModel.create(obj1);
    console.log("Data is added...");
  } catch (error) {
    console.log(error);
  }
})

router.get("/firequery", async () => {
  let queryResponse = await mongoPracticeModel.findOne();
  console.log(queryResponse);
  console.log(queryResponse.mixDataArray);

});

module.exports = router;
