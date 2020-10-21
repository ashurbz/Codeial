const mongoose = require('mongoose');   // require mongoose

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars')

const userSchema = new mongoose.Schema({    // create new Schema
    email:{
        type: String,
        unique: true,
        required: true
    },
    
    name:{
        type:String,
        required:true
    },
  
    password:{
        type: String,
        required: true
    },
    avatar:{
        type:String
    }
},
    
{
    timestamps: true
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

  //static functions
  userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);   //model name is User
module.exports = User;