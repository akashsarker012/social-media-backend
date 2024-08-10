const express = require('express');
const app = express();
const apiRoute = require('./routes/index.js');
const port = 8000;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const dbConnection = require('./connectDb/connectDb')
dbConnection();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(apiRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
