import User from "../models/userModel.js"
import asyncHandler from "./asynHandler.js"
import jwt from 'jsonwebtoken'

const protect = asyncHandler(async(req,res,next)=>{
    const token = req.cookies.JWT
    if (token){
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if (decoded){
            req.user = await User.findById(decoded._id).select('-password')
            next()
        }else{
            res.status(400)
            throw new Error("Invalid Token")            
        }
        
    }else{
        res.status(400)
        throw new Error("Token not found")
    }
})

const admin = asyncHandler(async(req,res,next)=>{
    if (req.user.isAdmin){
        console.log('admin user')
        next()
    }else{
        res.status(400)
        throw new Error("Access denied")
    }
})

export {protect,admin}