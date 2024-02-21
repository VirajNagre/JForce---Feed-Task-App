import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    approved:{
        type:Boolean,
        required:true,
        default:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    rejected:{
        type:Boolean,
        required:true,
        default:false
    },
},

    {
        timestamps:true,
    },
)

const Post = mongoose.model("Post",postSchema);

export default Post;

