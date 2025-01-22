import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    requirements:[{
        type:String,
    }],
    salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    positions:{
        type:Number,
        required:true
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Application",
        }
    ]
},{timestamps:true});

export const Job = mongoose.model('Job',jobSchema);