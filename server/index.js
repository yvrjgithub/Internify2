import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({})
import dbconnect from "./utils/db.js";
import userRoute from './routes/userroute.js';
import companyRoute from './routes/comproute.js';
import jobRoute from './routes/jobroute.js';
import applicationRoute from './routes/approute.js'


const PORT = 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'https://internify2-n7mz.vercel.app',
    credentials:true
}
app.use(cors(corsOptions))

app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/job',jobRoute);
app.use('/api/v1/application',applicationRoute);

app.listen(PORT,()=>{
    dbconnect();
    console.log(`server is running at port ${PORT}`);
})