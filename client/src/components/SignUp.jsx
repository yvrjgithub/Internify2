import React from 'react';
import Navbar from './shared/Navbar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup } from './ui/radio-group';
import { Button } from './ui/button';
import { Link,useNavigate } from 'react-router-dom';
import { API } from '@/constants.js';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';


const SignUp = () => {
   const dispatch = useDispatch();
   const {loading} = useSelector(store=>store.auth)
   const [input,setInput]= React.useState({
      fullname:"",
      email:"",
      phonenumber:"",
      password:"",
      file:"",
      role:"",
   })
   const navigate = useNavigate()
   const changeHandler=(e)=>{
      setInput({...input,[e.target.name]:e.target.value})
   }

   const submitHandler=async(e)=>{
      dispatch(setLoading(true));
      e.preventDefault();
      const data = new FormData();
      data.append("fullname",input.fullname)
      data.append("email",input.email)
      data.append("phonenumber",input.phonenumber)
      data.append("password",input.password)
      data.append("role",input.role)
      if(input.file){
        data.append("file",input.file)
      }
      try{
         const res = await axios.post(`http://localhost:5000/api/v1/user/register`,data,{
            headers:{"Content-Type":'multipart/formadata'},
            withCredentials:true
           })
         if(res.data.success){
            navigate('/login');
            toast.success(res.data.message)
         }
      }
      catch(err){
         console.log(err)
         toast.error(err.response.data.message)
      }finally{
         dispatch(setLoading(false));
      }
   }

   const fileHandler=(e)=>{
      setInput({...input,file:e.target.files?.[0]})
   }

  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-3/4 md:w-1/2 border-gray-300 rounded p-4 my-10 shadow-md '>
        <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
         <div className='p-2 '>
            <Label className='text-lg'>Full Name:</Label>
            <Input 
            type="text"
            placeholder = "John doe"
            name="fullname"
            value={input.fullname}
            onChange={changeHandler}
            className='text-lg'
            />
         </div>
         <div className='p-2 '>
            <Label className='text-lg'>Phone Number:</Label>
            <Input 
            type="tel"
            placeholder = "John doe"
            name="phonenumber"
            value={input.phonenumber}
            onChange={changeHandler}
            className='text-lg'
            />
         </div>
         <div className='p-2 '>
            <Label className='text-lg'>Email:</Label>
            <Input 
            type="email"
            placeholder = "John doe"
            name="email"
            value={input.email}
            onChange={changeHandler}
            className='text-lg'
            />
         </div>
         <div className='p-2 '>
            <Label className='text-lg'>Password:</Label>
            <Input 
            type="password"
            placeholder = "your password"
            name="password"
            value={input.password}
            onChange={changeHandler}
            className='text-lg'
            />
         </div>
         <div className='p-2 flex gap-2'>
         <Label className='text-lg my-1'>Profile:</Label>
            <Input 
            type="file"
            name="file"
            onChange={fileHandler}
            className='text-l cursor-pointer'
            accept="image/*"
            />
         </div>
        <RadioGroup className='flex m-2 py-2'>
         <div className='flex items-center space-x-2'>
            <input type="radio" name='role' value='student' checked={input.role == "student"} onChange={changeHandler}/>
            <Label className='text-lg'>Student</Label>
         </div>
         <div className='flex items-center space-x-2'>
            <input type="radio" name='role' value='recruiter' checked={input.role == "recruiter"} onChange={changeHandler}/>
            <Label className='text-lg'>Recruiter</Label>
         </div>
         </RadioGroup>
         {loading?
         <Button className='w-full bg-[#0778e1]'>
         <Loader2 className='animate-spin w-4 h-4'/>
         please wait
         </Button>:
         <Button className='w-full bg-[#0778e1]'>Sign up</Button>
         }
         <span className='my-4'>Already have an account? <Link to='/login'><Button variant="link" className='-mx-3 text-[#147fe3]'>LogIn</Button></Link></span>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
