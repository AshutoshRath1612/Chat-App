const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const maxAge = 3*60*60*24;
const createToken = (id)=>{
    return jwt.sign({id} , 'thisismysecret' , {
        expiresIn: maxAge
    })
}

module.exports.register = async(req, res,next) => {
    try{
        const { name, username, password, email } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
        return res.json({ msg: "Username already used", status: false })
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
        return res.json({ msg: "Email already used", status: false })

    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(password, salt);
    const user = await User.create({
       name, email, username, password: hashedpassword
    })

    const token = createToken(user._id);
    res.cookie('jwt' , token , {httpOnly:true ,maxAge:maxAge*1000});

    delete user.password;
    return res.json({user ,token, status:true})
    }
    catch(err){
       next(err);
    }
}
module.exports.login = async(req, res,next) => {
    try{
        const { username, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (!usernameCheck)
        return res.json({ msg: "User not found", status: false })
    const isPasswordValid =await bcrypt.compare(password , usernameCheck.password);
    if (!isPasswordValid)
    return res.json({ msg: "Password Incorrect", status: false });

    const token = createToken(usernameCheck._id);
    res.cookie('jwt' , token , {httpOnly:true ,maxAge:maxAge*1000});
    console.log(token)


    delete usernameCheck.password;
     return res.json({user:usernameCheck ,token, status:true})
    }
    catch(err){
        next(err);
    }
}

module.exports.setavatar = async(req, res,next) => {
    try{
        const userId =req.params.id;
        const avatarImage = req.body.image;
        const photoImage = req.body.photo;
        console.log(photoImage)
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
            photoImage
        })
        return res.json({isSet:userData.isAvatarImageSet ,image:userData.avatarImage , photo:userData.photoImage})

    }catch(err){
        next(err);
    }
}

module.exports.logout = (req,res)=>{
    res.cookie('jwt', "", {maxAge:1});
    res.redirect('/login');
}

module.exports.allusers = async(req,res,next)=>{
    try{
        const users = await User.find({_id:{$ne:req.params.id}}).select([
           "name", "email","username","avatarImage","_id" , "photoImage"
        ]);
        console.log(users)
        return res.json(users);
    }catch(err){
        next(err)
    }
}