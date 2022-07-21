const path = require('path');
// load dependencies
require('dotenv').config();
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const passport = require('passport');
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

require('./middlewares/passport');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors({origin: 'http://localhost:3000'}));

//Loading Routes
const apiRoutes = require('./routes/api');
const apiSecureRoutes = require('./routes/secure-api');
app.use('/api/v1', apiRoutes);
app.use('/api/v1', passport.authenticate('jwt', { session: false }), apiSecureRoutes);

// initialize socket io
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:3000"
      }
 });
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(passport.initialize()));
io.use(wrap(passport.authenticate('jwt', { session: false })));
io.use((socket, next) => {
    if ( socket.request.user ) {
        next();
    }
    else {
        next(new Error('unauthorized'))
    }
})
const socketRoutes = require('./routes/socket-api')(io);
io.on('connection', socketRoutes);

httpServer.listen(process.env.PORT);
console.log("App listening on port " + process.env.PORT);

