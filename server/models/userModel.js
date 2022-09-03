const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true,
        min:4,
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        min: 10
    },
    password: {
        type: String,
        require: true,
        min: 8
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:"",
    },
    photoImage:{
        type:String,
        default:"",
    }
});

module.exports = mongoose.model("User", userSchema);