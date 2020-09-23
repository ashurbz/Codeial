const User = require('../models/user')
// rendering sign up page
module.exports.SignUp= (req,res)=>{

    return res.render('sign_up',{
        title:'SignUp'
    })
}

// rendering sign in page
module.exports.signIn = (req,res)=>{

    return res.render('sign_in',{
        title:'Sign In'
    });
}

// creating user is sign up

module.exports.create = (req,res)=>{
    console.log(req.body);
    // check password or cnfrm password are same or not
    if(req.body.password != req.body.confirm_password){
       return res.redirect('back')

    }
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
           console.log(`error in finding user ${err}`); return;}
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){console.log(`error in creating user ${err}`); return;}
                
                return res.redirect('sign-in');

            })
                
            }
            else{
                console.log(`user already exists`);
              return  res.redirect('back');
            }
        });
    }
