const Post = require('../models/post');         // require post models

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