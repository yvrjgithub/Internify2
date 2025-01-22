import mongoose from "mongoose";

const dbconnect =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
    }
    catch(err){
        console.log(err);
    }
} 
export default dbconnect;