import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true,
    },
    email:{
        type:String,
        requried:true,
        unique:true,
    },
    password:{
        type:String,
        requried:true,
    }, 
    isAdmin:{
        type:Boolean,
        requried:true,
        default:false
    },
    phone:{
        type:Number,
        default:null,
    }
},{
    timestamps:true,
})

userSchema.methods.validatePassword = async function(inputPassword){
    //  console.log("inputPassword",inputPassword,"this.password",this.password)
    return await bcrypt.compare(inputPassword,this.password)
}

// userSchema.methods.getPasswordMod = async () =>{
//     return this.isModified()
// }

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        next()
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

const User = mongoose.model('User',userSchema);

export default User
