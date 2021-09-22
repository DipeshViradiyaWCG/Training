var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var fileobj = req.files.resume;
  fileobj.mv('public/images/'+fileobj.name, function (err) {
    if (err)
      return res.send("File not uploaded...");
    
  })
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dipesh.fakemail@gmail.com", // generated ethereal user
      pass: "dipeshfake", // generated ethereal password
    },
  });

  var mailOptions = {
    from: '"Dipesh\'s fake account" <dipesh.fakemail@gmail.com>',
    to: req.body.email,
    subject: req.body.sub,
    text : req.body.body,
    attachments : [
      {
        filename : fileobj.name,
        path : 'D:/WCG/Training 2021/22-09-2021/task2-mail-send/mailapphbs/public/images/'+fileobj.name
      }
    ]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.render("index", {
        error: "Your mail could not be sent due to some issue, Try again later please...",
        isError: true,
      });
    } else {
      console.log("Email has been sent: " + info.response);
      res.render("index", {
        success: "Mail Sent Successfully",
        isSuccess: true,
      });
    }
  });
});

module.exports = router;
