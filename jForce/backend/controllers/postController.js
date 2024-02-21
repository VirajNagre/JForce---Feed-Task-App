import asyncHandler from "../middleware/asynHandler.js";
import Post from "../models/postModel.js";

const createNewPost = asyncHandler(async(req,res)=>{
    const uId = req.user._id
    const {content} = req.body
    console.log(req.body)
    const postObj = {
        content,
        createdBy:uId,
    }
    console.log("createNewPost",postObj)
    try {
        const newPost = await Post.create(postObj)
        // console.log(newPost)
        res.json({newPost})            
    } catch (error) {
        res.status(500)
        throw new Error("Post was not created, try again later")
    }
})

const getMyPosts = asyncHandler(async(req,res)=>{
    // const query
    const uId = req.user._id
    try {
        const myPosts = await Post.find({"createdBy":uId}).populate("createdBy","name email phone").sort({createdAt:-1})
        if (myPosts){
            res.status(200).json(myPosts)
        }else{
            res.status(200).json("No posts found")
        }
    } catch (error) {
        res.send(404)
        throw new Error("Try again later")
    }

    
})

const getAllposts = asyncHandler(async(req,res)=>{
    try {
        console.log("all posts")
        const allPosts = await Post.find({approved:true}).populate('createdBy','name _id email').sort({createdAt:-1})
        res.json(allPosts)

    } catch (error) {
        res.sendStatus(404)
        throw new Error("Try again later")
    }
})

const getAdminAllposts = asyncHandler(async(req,res)=>{
    try {
        console.log("admin all posts")
        const allPosts = await Post.find().populate('createdBy','name _id email').sort({createdAt:-1})
        res.json(allPosts)

    } catch (error) {
        res.sendStatus(404)
        throw new Error("Try again later")
    }
})

const getPostById = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const post = await Post.findById(id).populate('createdBy','name email')
        if (post){
            res.status(200).json(post) 
        }else{
            res.status(404).json("Invalid post") 
        }
    } catch (error) {
        res.status(500)
        throw new Error("Try again later")
    }
})

const approvePost = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const post = await Post.findByIdAndUpdate(id,{approved:true,rejected:false})
        if (post){
            res.status(200).json(post) 
        }else{
            res.status(404).json("Invalid post") 
        }
    } catch (error) {
        res.status(500)
        throw new Error("Try again later")
    }
})

const rejectPost = asyncHandler(async(req,res)=>{
    console.log("rejectPost")
    const {id} = req.params
    try {
        const post = await Post.findByIdAndUpdate(id,{approved:false,rejected:true},)
        if (post){
            res.status(200).json(post) 
        }else{
            res.status(404).json("Invalid post") 
        }
    } catch (error) {
        res.status(500)
        throw new Error("Try again later")
    }
})

const deletePost = asyncHandler(async(req,res)=>{
    console.log("deletePost")
    const {id} = req.params
    try {
        const post = await Post.findByIdAndDelete(id)
        console.log(post)
        if (post){
            res.status(200).json("post has been successfully deleted") 
        }else{
            res.status(404).json("Post not found")
        }
    } catch (error) {
        res.status(500)
        throw new Error("Try again later")
    }
})



export {getAllposts,getPostById,createNewPost,getMyPosts,deletePost,getAdminAllposts,rejectPost,approvePost}

