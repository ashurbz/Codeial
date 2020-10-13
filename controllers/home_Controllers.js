const Post = require('../models/post')           // rquire post model
const User = require('../models/user')

module.exports.home=(req,res)=>{
    Post.find({}).sort("-createdAt").populate('user').populate({              // finding post and then populating user inside it
        path:'comment',                      //nesting populating of user and comment of that user
        populate:{
            path:'user'
        }
    })
    
    .exec((err,post)=>{           // exec function just like callback
       User.find({},(err,user)=>{
        return res.render('home',{
            title:'posts',
            post: post,
            all_user: user
        })
       })
        
    })

}