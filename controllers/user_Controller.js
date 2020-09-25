const User = require('../models/user')
// rendering sign up page
module.exports.SignUp= (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }

    return res.render('sign_up',{
        title:'SignUp'
    })
}

// rendering sign in page
module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('sign_in',{
        title:'Sign In'
    });
}

// render profile page
module.exports.profile = (req,res)=>{
    return res.render('user_profile',{
        title: 'profile page'
    })
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
              return res.redirect('back');
            }
        });
    };

module.exports.createSession = (req,res)=>{
   return res.redirect('profile');
}

module.exports.destroySession = (req,res)=>{
    req.logout();

    return res.redirect('/')
}
