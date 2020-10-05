const Comment = require('../models/comment'); // comments models required
const Post = require('../models/post'); // post model required

module.exports.create= (req,res)=>{
    Post.findById(req.body.post , (err,post)=>{     // finding post to create comment under it
        if(err){
            console.log(`error in finding post`); return;
        }
        if(post){
            Comment.create({                          // creating comment if post found
                content:req.body.content,           
                post:req.body.post,
                user:req.user._id
            },(err,comment)=>{
                if(err){console.log(`error in createing comment`); return;}     
                post.comment.push(comment);         // mongoose function to update comment
                post.save();          // telling db its final save it

                res.redirect('/');
            }
           
            )
        }
    })
}