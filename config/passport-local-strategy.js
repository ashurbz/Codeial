const passport = require('passport');
const LocalStartegy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStartegy({
    usernameField:email
},
    (email,password,done)=>{
        //finding user if present in db,comparing with email
        User.findOne({email:email},(err,user)=>{
            if(err){console.log(`error in finding user`); return done(null);}
            // user not found or password incorrect
            if(!user || user.password != password){
                console.log(`passowrd missmatch or invalid user`)
                return done(null,false);
            }
            //user matched
            return done(null, user);
        })
    }

));

// serializing user

passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

//deserializing user

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){console.log(`user is not found`); return done(err);}

        return done(null,user);
    })
});

module.exports = passport;

