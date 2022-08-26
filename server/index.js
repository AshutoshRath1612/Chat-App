const express = require('express');
const cors =require('cors')
const mongoose = require('mongoose')


require('dotenv').config();

const app =express();

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.mongo_url).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})

const server = app.listen(process.env.port , ()=>{
    console.log(`Server started on port ${process.env.port}`)
})