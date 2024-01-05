const express = require('express')
require('dotenv').config();
const app=express();
const connectToDB= require("./configs/db.js")
const cors=require('cors')
const userRoutes = require('./routes/userRoutes.js')

connectToDB();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/",userRoutes)

module.exports=app