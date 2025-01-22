import express from "express";
import isAuthenticated from "../middlewares/authenticated.js";
import { apply,getApplicants,getApplications,setStatus } from "../controllers/appcontroller.js";
const router = express.Router();

router.route('/apply').post(isAuthenticated,apply);
router.route('/get').get(isAuthenticated, getApplications);
router.route('/:id/applicants').get(isAuthenticated, getApplicants);
router.route('/:id/status/update').post (isAuthenticated,setStatus);

export default router;