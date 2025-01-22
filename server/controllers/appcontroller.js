import { Application } from "../models/appmodel.js";
import { Job } from "../models/jobmodel.js";

export const apply = async (req, res) => {
    try {
        const userId = req.id;
        const { job } = req.body; // Get jobId from request body instead of params

        // Input validation
        if (!job) {
            return res.status(400).json({
                message: "JobId required",
                success: false
            });
        }

        // Log the input data
        console.log('Applying with:', { userId, job });

        // Check if already applied
        const applied = await Application.findOne({ job, applicant: userId });
        if (applied) {
            return res.status(400).json({
                message: "Already applied",
                success: false
            });
        }

        // Verify job exists
        const jobExists = await Job.findById(job);
        if (!jobExists) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Create application with job field from request body
        const newApplication = await Application.create({
            job,
            applicant: userId,
            status: 'pending'
        });

        // Verify the application was created with job field
        console.log('Created application:', newApplication);

        // Add to job's applications array
        jobExists.applications.push(newApplication._id);
        await jobExists.save();

        // Double-check the saved application
        const savedApplication = await Application.findById(newApplication._id)
            .populate('job')
            .populate('applicant');
        
        console.log('Saved application with populated data:', savedApplication);

        return res.status(201).json({
            message: "Job applied successfully",
            success: true,
            application: newApplication
        });

    } catch (err) {
        console.log('Error in apply function:', err);
        return res.status(500).json({
            message: "Error applying to job",
            success: false,
            error: err.message
        });
    }
}
export const getApplications = async (req, res) => {
    try {
        const userId = req.id;
        
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 });
        
        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });
        
    } catch (err) {
        console.error('Error in getApplications:', err);
        return res.status(500).json({
            message: "Error fetching applications",
            success: false,
            error: err.message
        });
    }
}

export const getApplicants=async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).sort({createdAt:-1}).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
            }
        })
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false
            })
        }
        return res.status(201).json({
            job,
            success:true
        })
        
    }catch(err) {
        console.log(err)
    }
}

export const setStatus=async(req,res)=>{
    try {
        const {status} = req.body;
        const appId= req.params.id;
        if(!status){
            return res.status(400).json({
                message:"status is required",
                success:false
            })
        }
        const application =await  Application.findById(appId);
        if(!application){
            return res.status(404).json({
                message:"Applications not found",
                success:false
            })
        }
        application.status = status.toLowerCase();
        await application.save()
        return res.status(201).json({
            message:"status updated successfully",
            success:true
        })
        
    }catch(err) {
        console.log(err)
    }
}

