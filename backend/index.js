const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/database');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const session = require('express-session');

app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser());

app.use(express.json()); // Parse JSON data

app.use(expressLayouts);
app.use(express.static('./public/assets/'));

app.use(session({
  secret:'backendcodeapp',
  resave:false,
  saveUninitialized:false,
  resave:false,
})); 



app.set('view engine', 'ejs');
app.set('views', './views');

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
   origin: 'http://localhost:3000', // or the exact URL of your client
   credentials: true
}));

app.use('/', require('./routes'));


app.listen(port, () => {
    console.log('Server listening on port 5000');
  });
