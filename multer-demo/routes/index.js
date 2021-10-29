var express = require('express');
var router = express.Router();
const path = require("path");

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
  storage: multerStorage,
  // limits: { fileSize: 1000000 },
  limits: {
    fileSize: 1000000
  },

  fileFilter: function (req, file, cb) {
    console.log("111");
    var filetype = ['.csv'];
    if (filetype.indexOf(path.extname(file.originalname)) < '0') {
      console.log("222");
      return cb(new Error('File must be csv.'))

    }
    return cb(null, true);
  }
}).single("csvfile");

/* GET home page. */
router.get('/', function (req, res, next) {
  file_model
    .find()
    .lean()
    .then((data) => {
      console.log("data ==> " + data);
      res.render("index", {
        files: data
      });
    })
    .catch((err) => {
      throw err;
    });

  // res.render('index');
});

// router.post('/', upload.single("file1"), function (req, res, next) {
//   console.log(req.file);
//   new file_model({
//       f_name: req.file.filename
//     })
//     .save()
//     .then((files) => {
//       res.redirect("/");
//     })
//     .catch((err) => {
//       throw err;
//     });

// });

router.get('/multi', function (req, res, next) {
  file_model
    .find()
    .lean()
    .then((data) => {
      console.log("data ==> " + data);
      res.render("index-multi", {
        files: data
      });
    })
    .catch((err) => {
      throw err;
    });

  // res.render('index');
});

// router.post('/multi', upload.array("file1"), function (req, res, next) {
//   console.log(req.files);
//   let files_name_array = req.files.map((file) => {
//     return {
//       f_name: file.filename
//     }
//   })
//   file_model.insertMany(files_name_array).then((files) => {
//     res.redirect("/multi")
//   })
// });






router.get("/multiapi", (req, res, next) => res.render("ajax"));

// router.post("/multiapi", upload.array("fileMultiple"), async (req, res, next) => {

//   let files_name_array = req.files.map((file) => {
//     return {
//       f_name: file.filename
//     }
//   })

//   try {
//     await file_model.insertMany(files_name_array);
//     res.send("Uploaded...");

//   } catch (error) {
//     res.send(error);
//   }
// });

router.get("/event", (req, res, next) => {
  res.render("event");
});

const {
  getClientIp
} = require('@supercharge/request-ip')

router.get("/display", async function (req, res, next) {
  console.log("CALLED");
  console.log(getClientIp(req));
  console.log("req.ip", req.ip);
  console.log(req.socket.remoteAddress);
  return res.json();
});






/**
 * CSV to JSON task.
 */
const csv = require("csvtojson");
const userModel = require("../models/users");
const qs = require("qs");

router.get("/csvtojson", (req, res, next) => res.render("csvtojson"));

router.post("/csvtojson", async (req, res, next) => {
  // console.log(req.file);
  upload(req, res, async function (err) {
    if (err) {
      console.log("333");
      console.log(err);
      res.send({
        type:"error",
        message:err.message
      });
    } else {
      const filePath = req.file.path;
      try {
        let jsonResponse = await csv().fromFile(filePath);
        // console.log(jsonResponse);
        res.send({
          type:"success",
          data:jsonResponse
        });
      } catch (error) {
        console.log(error);
        res.send({
          type:"error",
          message:"An error was occured in processing your data..."
        });
      }

    }
  });
});

router.post("/storecsv", async function (req, res, next) {
  // console.log(req.body);
  // console.log(req.body.list)
  // console.log(req.body.list);
  console.log(qs.parse(req.body));
  let insertData = qs.parse(req.body).list;
  console.log(insertData);
  try {
    await userModel.insertMany(insertData);
    res.send("Uploaded...aaa");
  } catch (error) {
    console.log(error);
    res.send("Something went wrong in data upload...")
  }

});


module.exports = router;