const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// .env
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '../../frontend/build')));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Controllers
require('./app/controllers')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

app.listen(process.env.PORT || 3000);

module.exports = app;
