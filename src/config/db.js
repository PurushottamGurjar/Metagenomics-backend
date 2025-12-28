import mongoose from "mongoose";
import './env.js'

export const connectDB= async()=>{
    try{
        console.log(process.env.MONGO_URI);
        console.log("fuck off");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Your DB connect Successfully");
    }
    catch(err){
        console.error(err);
        console.log("Han bhai error ha rhi h sach me bhai dev wali se banaya some error ");
        process.exit(1);
    }
};