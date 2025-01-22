import {User} from '../models/usermodel.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';


export const register = async(req,res)=>{
    try{
        const {fullname,email,phonenumber,password,role}=req.body;
        if(!fullname || !email || !password || !phonenumber || !role){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        }
        const user = await User.findOne({email})
        const file = req.file
        const uri = getUri(file)
        const cloudRes = await cloudinary.uploader.upload(uri.content)
        if(user){
            return res.status(400).json({
                message:"user already exists",
                success:false
            });
        }
        const hashedPass = await bcrypt.hash(password,10);

        await User.create({
            fullname,
            email,
            phonenumber,
            password:hashedPass,
            role,
            profile:{
                profilePhoto:cloudRes.secure_url
            }
        })
        return res.status(201).json({
            message:'Accopunt Created Successfully',
            success:true
        })
    }
    catch(err){
        console.log(err);
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Incorrect Email or Password",
                success:false
            });
        }
        
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({
                message:"Incorrect Email or Password",
                success:false
            });
        }

        if(role != user.role){
            return res.status(400).json({
                message:"User doesnt exist with current role",
                success:false
            });
        }

        const tokenData = {
            UserId:user._id
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"10d"})

        let user1 = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phonenumber:user.phonenumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token",token,{maxAge:24*60*60*1000,httpsOnly:true,sameSite:"strict"}).json({
            message:`welcome ${user.fullname}`,
            user1,
            success:true
        })
    }
    catch(err){
        console.log(err);
    }
}

export const logout = async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:'Logged out successfully',
            success:true
        })
    }
    catch(err){
        console.log(err);
    }
}

export const updateProfile = async(req,res)=>{
    try{
        const {fullname,email,phonenumber,bio,skills}= req.body;
        const file = req.file;
        let cloudRes = null;
        
        if(file){
            const uri = getUri(file);
            // Check if the file is a PDF
            if(file.mimetype === 'application/pdf') {
                // Specific options for PDF upload
                cloudRes = await cloudinary.uploader.upload(uri.content, {
                    resource_type: 'raw',  // Important for PDFs
                    format: 'pdf',         // Explicitly specify PDF format
                    flags: 'attachment'     // Ensures it's treated as a downloadable file
                });
            } else {
                // Handle other file types (images) as before
                cloudRes = await cloudinary.uploader.upload(uri.content);
            }
        }
        
        const userId = req.id;
        let user = await User.findById(userId);   
        const skillsArray = skills ? skills.split(',') : []; 

        if(!user){
            return res.status(400).json({
                message:"user not found",
                success:false
            });
        }

        // Update user fields if provided
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phonenumber) user.phonenumber = phonenumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;
        
        // Update resume if file was uploaded successfully
        if(file && cloudRes){
            user.profile.resume = cloudRes.secure_url;
            user.profile.resumeName = file.originalname;
        }

        await user.save();

        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: 'User updated successfully',
            user: userResponse,
            success: true
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Error updating profile',
            success: false,
            error: err.message
        });
    }
}
