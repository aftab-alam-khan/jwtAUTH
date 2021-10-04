const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');


//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();


// connect to DB 
// localhost to connect mongodb "mongodb://localhost:27017/jwtAuth"
mongoose.connect((process.env.DB_CONNECT || 'mongodb://localhost:27017/jwtAuth'), { useNewUrlParser: true })
    .then(() => console.log('connected to db successfull...'))
    .catch(err => console.log(err));

//Middleware
app.use(express.json()) // for parsing application/json


//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen('3000', () => console.log('Server up and running'));
