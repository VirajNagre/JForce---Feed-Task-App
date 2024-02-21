import mongoose from "mongoose"


const connectDB = async () =>{
    try {
        // console.log("database conenct",process.env.DB_URI)
        var con = await mongoose.connect(process.env.DB_URI)
        console.log('db connected',con.connection.host)
    } catch (error) {
        console.log('db connection failed',error)
    }
}

export default connectDB
