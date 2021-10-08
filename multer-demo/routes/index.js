var express = require('express');
var router = express.Router();

const file_model = require("../models/file_model");
const multer = require("multer");
// const upload = multer({ dest: "public/images" });

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    // const ext = file.mimetype.split("/")[1];
    cb(null, `/images/D-${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});

const upload = multer({
  storage: multerStorage
});

/* GET home page. */
router.get('/', function(req, res, next) {
  file_model
  .find()
  .lean()
  .then((data) => {
    console.log("data ==> " + data);
    res.render("index", {files : data});
  })
  .catch((err) => {
    throw err;
  });

  // res.render('index');
});

router.post('/', upload.single("file1"), function(req, res, next) {
  console.log(req.file);
  new file_model({
    f_name : req.file.filename
  })
  .save()
  .then((files) => {
    res.redirect("/");
  })
  .catch((err) => {
    throw err;
  });

});

router.get('/multi', function(req, res, next) {
  file_model
  .find()
  .lean()
  .then((data) => {
    console.log("data ==> " + data);
    res.render("index-multi", {files : data});
  })
  .catch((err) => {
    throw err;
  });

  // res.render('index');
});

router.post('/multi', upload.array("file1"), function(req, res, next) {
  console.log(req.files);
  let files_name_array = req.files.map((file)=>{
    return {f_name : file.filename}
  })
  file_model.insertMany(files_name_array).then((files)=>{
    res.redirect("/multi")

  })

});

module.exports = router;
