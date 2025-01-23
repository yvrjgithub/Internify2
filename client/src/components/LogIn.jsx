import React from 'react';
import Navbar from './shared/Navbar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup } from './ui/radio-group';
import { Button } from './ui/button';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading ,setUser} from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector(store=>store.auth)
  const {user} = useSelector(store=>store.auth)
  const [input,setInput]= React.useState({
    email:"",
    password:"",
    role:"",
 })

 const changeHandler=(e)=>{
  setInput({...input,[e.target.name]:e.target.value})
}

const submitHandler=async(e)=>{
   dispatch(setLoading(true));
  e.preventDefault();
  try{
     const res = await axios.post(`https://internify2.onrender.com/api/v1/user/login`,input,{
        withCredentials:true
     })
     if(res.data.success){
         dispatch(setUser(res.data.user1))
        navigate('/');
        toast.success(res.data.message)
     }
  }
  catch(err){
     console.log(err)
  }finally{
   dispatch(setLoading(false));
  }
}
  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-3/4 md:w-1/2 border-gray-300 rounded p-4 my-10 shadow-md '>
        <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
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
         <Button className='w-full bg-[#0778e1]'>Log in</Button>
         }
         <span className='my-4'>Dont have an Acoount? <Link to='/signup'><Button variant="link" className='-mx-3 text-[#147fe3]'>SignUp</Button></Link></span>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
