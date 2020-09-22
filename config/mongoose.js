const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error',console.error.bind('console',"error in connecting to Db"));

db.once('open',()=>{
    console.log('Database Successfuly Connected');
})

module.exports =db;
