const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const sgTransport = require('nodemailer-sendgrid-transport');

const { transporter, host, port, user, pass } = require('../config/mail');

let transporterConfig = {};
if (transporter === 'smtp') {
  transporterConfig = {
    host,
    port,
    auth: { user, pass },
  };
} else {
  transporterConfig = sgTransport({
    auth: {
      api_user: user,
      api_key: pass,
    },
  });
}

const transport = nodemailer.createTransport(transporterConfig);

transport.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
}));

module.exports = transport;
