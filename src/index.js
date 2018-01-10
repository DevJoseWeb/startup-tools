const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const i18n = require('i18n');

// .env
require('dotenv').config();

// i18n
const i18nConfig = require('./config/i18n');
i18n.configure(i18nConfig);

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(i18n.init);

// Controllers
app.use('/api', require('./app/routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(process.env.PORT || 3001);

module.exports = app;
