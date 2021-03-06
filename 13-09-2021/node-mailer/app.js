const nodemailer = require("nodemailer");

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
    to: "dipeshstark@gmail.com", // list of receivers
    subject: "Hello Real dipesh , I am fake dipesh...", // Subject line
	attachments: [
        {
            'filename': 'demo.txt',
            'path': 'D:/WCG/Training 2021/13-09-2021/modules-demo/demo.txt'
        },
        {
            'filename': 'hello.txt',
            'content': 'Hello content...'
        }
    ],
    text: "Hello Real dipesh , I am fake dipesh...", // plain text body
    html: "<b>Hello world</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);