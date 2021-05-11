const express = require('express');

const hostname = '0.0.0.0';
const port = 3000;

const cors = require('cors');

const server = express();

server.use(cors({
    credentials: true,
    origin: 'http://localhost'
}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/apinode');

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

const userRoute = require('./routes/userRoute');
userRoute(server);

const postRoute = require('./routes/postRoute');
postRoute(server);

const commentRoute = require('./routes/commentRoute');
commentRoute(server);

server.listen(port, hostname);