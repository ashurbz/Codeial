const User = require('../models/user')
// rendering sign up page

module.exports.profile = (req,res)=>{
    // checking if cookie is there or not
   if(req.cookies.user_id){
        User.findById(req.cookies.user_id,(err,user)=>{
            if(err){console.log(`error in finding user ${err}`); return;}
            if(user){
                // if user find
                return res.render('user_profile',{
                    title:'userProfile',
                    user:user
                })
            }else{
            return res.redirect('sign-in');

            }
        });
     } else{
            return res.redirect('sign-in');
        }
   }


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

// creating user in sign up

module.exports.create = (req,res)=>{
    console.log(req.body);
    // check password or cnfrm password are same or not
    if(req.body.password != req.body.confirm_password){
       return res.redirect('back')

    }
    //finding if user is present or not
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
           console.log(`error in finding user ${err}`); return;}
           // if not found we created new user
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){console.log(`error in creating user ${err}`); return;}
                
                return res.redirect('sign-in');

            })
            
            }
            // if user already there
            else{
                console.log(`user already exists`);
              return  res.redirect('back');
            }
        });
    }


module.exports.createSession = (req,res)=>{
    //if user is present
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){console.log(`error in finding user in sign up ${err}`);return;}

        if(user){
            //matching password
            if(user.password != req.body.password){
              return  res.redirect('back');
            }
           // setting up the cookie
            res.cookie('user_id',user.id);
            return res.redirect('profile')
        }else{
            return res.redirect('back');
    }
    })
      
}

module.exports.destroySession = (req,res)=>{
    res.cookie('user_id','');
    return res.redirect('sign-in');
}
