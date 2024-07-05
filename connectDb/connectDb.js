const express = require('express')
const mongoose = require('mongoose');

const dotenv = require('dotenv')

function dbConection() {

    mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected!'));


}

module.exports = dbConection