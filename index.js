const express = require('express'); // require express
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts'); // require express layouts
const app = express(); // app is express
const db = require('./config/mongoose');
const port = 8000;   // declared the port
app.use(expressLayouts); // using express layouts

const session = require('express-session');
const mongoStore= require('connect-mongo')(session);
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(cookieParser());
app.set('layout extractStyles',true); // using css of different pages to shown in right way
app.set('layout extractScripts',true);// using script of different pages to shown in right way
app.use(express.static('./assets'));    // Setting assests folder for css js files
app.use(express.urlencoded());








app.set('view engine','ejs');   // setting view engine as ejs

app.set('views','./views'); // setting up view engine folder as views

app.use(session({
    cookie: 'codeial',
    //secret to be changed later
    secret:'something',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:(1000*3600*48)
    },
    store: new mongoStore({
        mongooseConnection : db,
        autoRemove: 'disabled' 
    },(err)=>{
        if(err){console.log(`error is creating store`)}
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));    // routes used, giving directory of routes




// fire up the server
app.listen(port,(err)=>{
    if(err){
        console.log(`Server is not running Error: ${err}`)
    }
    console.log(`Server is running on port: ${port}`);
})