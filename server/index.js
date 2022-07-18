const path = require('path');
// load dependencies
const env = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

env.config();
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