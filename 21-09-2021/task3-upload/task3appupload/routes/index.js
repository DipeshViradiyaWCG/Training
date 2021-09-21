var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/form-process', function (req, res, next) {
  var fileobj = req.files.photo;
  var message;
  if((fileobj.mimetype == 'image/jpg' || fileobj.mimetype == 'image/jpeg' || fileobj.mimetype == 'image/gif' || fileobj.mimetype == 'image/png') && fileobj.size <= (2048*1024)){
    fileobj.mv("public/images/"+fileobj.name, function (err) {
      if (err)
        return res.status(500).send(err);
      })
    message ="File uploaded succesfully...";
  } else {
    message = "File size was more than 2 mb or it was not img file...";
  }
  res.render('formprocess', {test : message});
  console.log(req.files.photo);
})

module.exports = router;
