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
import path from "path";

const _dirname = path.resolve();
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'https://internify2.onrender.com',
    credentials:true
}
app.use(cors(corsOptions))

app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/job',jobRoute);
app.use('/api/v1/application',applicationRoute);

app.use(express.static(path.join(_dirname,'/client/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"))
})
app.listen(PORT,()=>{
    dbconnect();
    console.log(`server is running at port ${PORT}`);
})