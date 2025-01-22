import { Job } from "../models/jobmodel.js";
import {Company} from '../models/companymodel.js'
export const postJob = async(req,res) => {
    try {
        const {title,description,requirements,salary,location,jobtype,experience,positions,companyId} = req.body;
        const userId = req.id;
        
        // Validate required fields
        if(!title || !description || !requirements || !salary || !location || 
           !jobtype || !positions || !companyId || !experience){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        // Handle requirements as either string or array
        const requirementsArray = typeof requirements === 'string' 
            ? requirements.includes(',') 
                ? requirements.split(',') 
                : [requirements]
            : requirements;

        const job = await Job.create({
            title,
            description,
            requirements: requirementsArray,
            salary: Number(salary),
            location,
            jobtype,
            experience,
            positions,
            companyId,
            createdby: userId
        })

        return res.status(201).json({
            message: "Job created successfully",
            job,
            success: true
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getAllJobs=async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {descrition:{$regex:keyword,$options:"i"}},
            ]
        }
        const jobs = await Job.find(query).populate({
            path:"companyId",
        });
        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    }catch(err){
        console.log(err)
    }
}

export const getJobById = async(req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate([
            {
                path: "applications"
            },
            {
                path: "companyId"
            }
        ]);
        
        if(!job) {
            return res.status(404).json({
                message: "No job found",
                success: false
            })
        }
        
        return res.status(200).json({
            job,
            success: true
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getAdminJobs=async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({createdby:adminId}).populate({
            path:"companyId",
        });;
        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    }catch(err){
        console.log(err)
    }
}

