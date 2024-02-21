import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./DB/dbConfig.js";
import bodyparser from 'body-parser';
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express()

import userRoute from './routes/userRoutes.js'
import postRoute from './routes/postRoute.js'
dotenv.config({path:"backend/.env"});

connectDB()

app.use(cors({
    // origin:"http://192.168.0.104:3000",
    // origin:"http://192.168.18.242:3000",
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(cookieParser())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

app.use('/api/user',userRoute)
app.use('/api/post',postRoute)

app.use(errorHandler)
app.listen(process.env.PORT,()=>{console.log(`server now running on ${process.env.PORT}`)})

