require('dotenv').config();
const nodemailer = require('nodemailer');
const config = require('../config/auth.config');

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport
    .sendMail({
      from: 'EOS Crystal Team',
      to: email,
      subject: 'Please confirm your account',
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name},</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link:</p>
        <a href=https://crystal.wovodat.org/confirm/${confirmationCode}> Click here</a>
        <p>Regards, </p>
        <p>EOS Developer Team </p>
        </div>`,
    })
    .catch((err) => console.log(err));
};
