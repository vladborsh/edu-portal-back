var nodemailer = require("nodemailer");
var env = process.env.NODE_ENV || 'dev';
var config = require(`../config/${env}.config`);

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mailer.user,
    pass: config.mailer.pass
  }
});

module.exports.sendEmail = (from, to, subject, text) => {
  transporter.sendMail({ from, to, subject, text }, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
