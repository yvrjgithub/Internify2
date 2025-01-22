import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUD, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET
});

export default cloudinary;
    
  