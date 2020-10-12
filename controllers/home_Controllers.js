const Post = require('../models/post')           // rquire post model

module.exports.home=(req,res)=>{
    Post.find({}).sort("-createdAt").populate('user').populate({              // finding post and then populating user inside it
        path:'comment',                      //nesting populating of user and comment of that user
        populate:{
            path:'user'
        }
    })
    
    .exec((err,post)=>{                       // exec function just like callback
        if(err){
            console.log(`error is finding post`);
            return;
        }
        return res.render('home',{
            title:'posts',
            post: post
        })
    })

}