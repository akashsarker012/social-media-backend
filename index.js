const express = require('express')
const app = express()
const router = express.Router();
const apiRoute = require('./routes/index.js')
const port = 8000
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');

require('dotenv/config')

const dbConection = require('./connectDb/connectDb')
dbConection()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.json())


app.use(apiRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

