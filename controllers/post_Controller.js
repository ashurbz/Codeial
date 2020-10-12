const Post = require('../models/post');        // require post models
const Comment = require('../models/comment')


module.exports.create = (req,res)=>{
    Post.create({                               // creating posts                            
        content: req.body.content,
        user: req.user._id
    },(err,post)=>{
        if(err){
            console.log(`error in creating post`); return;
        }
        return res.redirect('back');
    })
}

module.exports.destroy =(req,res)=>{     // deleting post
    Post.findById(req.params.id,(err,post)=>{
        if(err){console.log(`error in finding the post`); return;}

            if(post.user== req.user.id){            // if post found then watching if post is created by same user who is logged in
                post.remove();                      // removing post

                Comment.deleteMany({post:req.params.id},(err)=>{               // deleting comments associated with that post
                    return res.redirect('back')
                })

            }else{
             return   res.redirect('back')
            }
        
    })
}