var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/result', function(req, res, next) {
  var msg = "Mail sent successfully";
  res.render('result', {result : msg});
});

router.post('/', function(req, res, next) {
  console.log(req.body);

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "dipesh.fakemail@gmail.com", // generated ethereal user
        pass: "dipeshfake", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Dipesh\'s fake account" <dipesh.fakemail@gmail.com>', // sender address
      to: "dipesh40939@gmail.com", // list of receivers
      subject: "You got a new user...", // Subject line
      text: "User details...", // plain text body
      html: `<table border="1">
                <tr>
                    <th>Detail</th>
                    <th>Data</th>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>${req.body.name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>${req.body.email}</td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>${req.body.password}</td>
                </tr>
                <tr>
                    <td>Mobile no.</td>
                    <td>${req.body.mobile}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>${req.body.gender}</td>
                </tr>
            </table>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);

  res.redirect('result');
});

module.exports = router;
