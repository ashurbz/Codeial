const Post = require('../models/post')

module.exports.home=(req,res)=>{
    Post.find({}).populate('user').populate({
        path:'comment',
        populate:{
            path:'user'
        }
    })
    
    .exec((err,post)=>{
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