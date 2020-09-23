const mongoose = require('mongoose');  // requiring mongoose
mongoose.connect('mongodb://localhost/codeial_dev');   // establishing connection

const db = mongoose.connection;   // if connection succesfull

db.on('error',console.error.bind('console',"error in connecting to Db"));  // if there is error in connecting

db.once('open',()=>{
    console.log('Database Successfuly Connected');
})

module.exports =db;   // exporting module
 