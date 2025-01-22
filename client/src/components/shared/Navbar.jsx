import React from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { Popover,PopoverContent,PopoverTrigger } from '@radix-ui/react-popover';
import { Avatar,AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '../ui/button';
import { User2,LogOut } from 'lucide-react';
import { AlignJustify } from 'lucide-react';
import Menu from './Menu';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const navigate = useNavigate()
  const {user} = useSelector(store=>store.auth)
  let [menu,setMenu] = React.useState(false);
  const dispatch = useDispatch()
  const logoutHandler=async()=>{
    try {
      const res = await axios.get(`https://internify2.onrender.com/api/v1/user/logout`,{withCredentials:true})
      if(res.data.success){
        dispatch(setUser(null))
        toast.success(res.data.message)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  let toggle=()=>{
    setMenu(!menu)
  }
  const handleLogin=()=>{
    navigate('/login')
  }
  const handleSignup=()=>{
    navigate('/signup')
  }
  const handleHome=()=>{
    navigate('/')
  }
  const handleBrowse=()=>{
    navigate('/browse')
  }
  const handleInt=()=>{
    navigate('/internships')
  }
  const handlePro=()=>{
    navigate('/profile')
  }
  const handleAdComp=()=>{
    navigate('/admin/companies')
  }
  const handleAdJobs=()=>{
    navigate('/admin/jobs')
  }
  return (
    <div>
    <div className='flex justify-between w-11/12 mx-auto '>
      <div className='py-2'>
        <p className='text-3xl font-semibold'><span className='text-[#147fe3]'>Interni</span>Fy</p> 
      </div>
      <div className='flex'>
        <ul className='flex py-4 mx-4'>
          {
            user&&user.role=='recruiter'?
              <>
               <li className='px-4 text-l font-semibold  hover:underline hidden md:block' onClick={handleAdComp}>Companies</li>
               <li className='px-4 text-l font-semibold  hover:underline hidden md:block' onClick={handleAdJobs}>Jobs</li>
              </>
            :
              <>
               <li className='px-4 text-l font-semibold  hover:underline hidden md:block' onClick={handleHome}>Home</li>
               <li className='px-4 text-l font-semibold  hover:underline hidden md:block' onClick={handleInt}>Internships</li>
                <li className='px-4 text-l font-semibold  hover:underline hidden md:block' onClick={handleBrowse}>Browse</li>
              </> 
          }
         
        </ul>
        {!user ? 
        <div className='my-3 gap-4 hidden md:block '>
          <Button variant="outline" className='mx-4 bg-[#CDE4E1]' onClick={handleLogin}>LogIn</Button>
          <Button className='bg-[#147fe3]' onClick={handleSignup}>SignUp</Button>
        </div>
      :
      <Popover>
      <PopoverTrigger >
        <Avatar className='cursor-pointer '><AvatarImage src={user.profile.profilePhoto} alt='user' className='h-10 w-10  rounded-full'/></Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80 shadow my-2 bg-white">
      <div className="flex ">
        <Avatar className='cursor-pointer'><AvatarImage src={user.profile.profilePhoto} alt='user' className='h-11 w-11 mx-2 my-3 rounded-full'/></Avatar>
        <div className='py-2'>
        <h2 className='text-l font-medium '>{user.fullname}</h2>
        <h2 className='text-muted-foreground'>
  {user.role=='student' && user.profile && user.profile.bio ? user.profile.bio.slice(0, 27) + '...' : ''}
</h2>
        </div>
      </div>
      {user&&user.role=='recruiter'?
      <></>:
      <div className='flex mx-4 gap-2'>
      <User2/>
      <Button variant="link" className='text-l' onClick={handlePro}>View Profile</Button>
      </div>
      }
      <div className='flex mx-4 gap-2'>
      <LogOut/>
      <Button variant="link" className='text-l' onClick={logoutHandler}>logout</Button>
      <br /><br />
      </div>
    </PopoverContent>
     </Popover>  
        }
         <AlignJustify className='md:hidden m-4' onClick={toggle}/>
      </div>
    </div>
    {menu?<Menu/>:<></>}
    
    </div>
  );
}

export default Navbar;
