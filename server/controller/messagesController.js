const msgModel = require("../models/msgModel");

module.exports.addMessage =async(req,res,next)=>{
    try{
        const {from ,to ,message} = req.body;
        const data = await msgModel.create({
            message:{text:message},
            users: [from ,to],
            sender: from
        });
        if(data) return res.json({msg:"Message added Successfully"})
        return res.json({msg:"Failed to add msg"})
    }catch(e){
        next(e);
    }
}
module.exports.getAllMessage =async(req,res,next)=>{
    try{
        const {from ,to} =req.body;
        const messages = await msgModel.find({
            users:{
                $all : [from ,to],
            }
        }).sort({updatedAt:1});
        const showMessages = messages.map((msg)=>{
            return{
                fromSelf:msg.sender.toString()=== from,
                message : msg.message.text,
            }
        })
        return res.json(showMessages);
    }catch(e){
        next(e);
    }
}