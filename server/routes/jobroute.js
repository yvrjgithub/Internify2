import express from "express";
import isAuthenticated from "../middlewares/authenticated.js";
import { postJob,getAdminJobs,getAllJobs,getJobById } from "../controllers/jobcontroller.js";

const router = express.Router();

router.route('/post').post(isAuthenticated,postJob);
router.route('/get').get(getAllJobs);
router.route('/get/:id').get(isAuthenticated,getJobById);
router.route('/getAdmin').get(isAuthenticated,getAdminJobs);

export default router;

