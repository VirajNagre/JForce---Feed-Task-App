import asynHandler from "../middleware/asynHandler.js"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"  

const registerUser = asynHandler(async (req, res) => {
  const newUser = req.body;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/

  console.log(phoneRegex.test(newUser.phone))

  if ((!newUser.email || !newUser.name || !newUser.password || !newUser.phone || !emailRegex.test(newUser.email))) {
    res.status(404)
    throw new Error("Invalid inputs")
  } else {
    const userExists = await User.findOne({ email: newUser?.email });
    console.log("userExists", userExists);

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    } else {
      const createdUser = await User.create(newUser);
      if (createdUser) {
        res.status(200).json("Registration Successful");
      } else {
        res.status(500);
        throw new Error("Registration failed, try again later");
      }
    }
  }
});


const loginUser = asynHandler(async(req,res)=>{
    console.log("log")
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const {email,password} = req.body
    console.log(email,password)

    if (emailRegex.test(email)){
        const userExists = await User.findOne({email})
        if (userExists && await userExists.validatePassword(password)){
            const tokenData={
                "_id":userExists._id,
                "email":userExists.email
            }
            const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"1d"})
            const userInfo = {
                email:userExists.email,
                name:userExists.name,
                isAdmin:userExists.isAdmin,
                phone:userExists.phone,
            }
            res.status(200).cookie("JWT",token).json(userInfo)
    
        }else{
            res.status(401)
            throw new Error("Invalid credentials")
        }
    }else{
        res.status(401)
        throw new Error("Invalid inputs")        
    }
    // console.log("userLogin",req.body)





})

export {registerUser,loginUser}