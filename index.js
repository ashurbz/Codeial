const express = require('express');
const app = express();
const port = 8000;

app.use('/', require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');




// fire up the server
app.listen(port,(err)=>{
    if(err){
        console.log(`Server is not running Error: ${err}`)
    }
    console.log(`Server is running on port: ${port}`);
})