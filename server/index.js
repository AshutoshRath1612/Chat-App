const express = require('express');
const cors =require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes');
const messageRoutes =require('./routes/messagesRoutes')
const cookieParser = require('cookie-parser');
const socket =require('socket.io');

require('dotenv').config();

const app =express();

const corsConfig = {
    credentials: true,
    origin: "http://localhost:3000",
};
app.use(cors(corsConfig));
app.use(express.json())
app.use(cookieParser());


// app.get('*',checkUser)
app.use('/api/auth' , userRoutes);
app.use('/api/messages' , messageRoutes);

mongoose.connect(process.env.mongo_url).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})

const server = app.listen(process.env.port , ()=>{
    console.log(`Server started on port ${process.env.port}`)
})

const io =socket(server,{
    cors:{
        origin:'http://localhost:3000',
        credentials:true,
    }
});

global.onlineUsers = new Map();

io.on("connection" , (socket)=>{
    global.chatSocket =socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId , socket.id);
    })
    socket.on("send-msg", (data)=>{
        const sendUserSocket  = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-receive' , data.message);
        }
    })
})