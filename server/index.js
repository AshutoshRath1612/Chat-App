const express = require('express');
const cors =require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app =express();

const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.use(express.json())
app.use(cookieParser());


// app.get('*',checkUser)
app.use('/api/auth' , userRoutes);

mongoose.connect(process.env.mongo_url).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})

const server = app.listen(process.env.port , ()=>{
    console.log(`Server started on port ${process.env.port}`)
})