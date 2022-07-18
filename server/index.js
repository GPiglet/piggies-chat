const path = require('path');
// load dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require("mongoose");

// connect mongodb

const { MONGO_URI } = process.env;
mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Successfully connected to database");
})
.catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
});


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors({origin: 'http://localhost:3000'}));

//Loading Routes
const apiRoutes = require('./routes/api');
app.use('/api/v1', apiRoutes);

app.listen(process.env.PORT);
//pending set timezone
console.log("App listening on port " + process.env.PORT);