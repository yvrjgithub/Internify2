import express from "express";
import isAuthenticated from "../middlewares/authenticated.js";
import {register,login,logout,updateProfile} from '../controllers/usercontroller.js'
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route('/register').post(singleUpload,register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/update').post(isAuthenticated,singleUpload,updateProfile);

export default router;

