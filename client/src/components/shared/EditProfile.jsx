import React from 'react';
import axios from 'axios';
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
 } from '../ui/dialog';
 import { Label } from '../ui/label';
 import { Input } from '../ui/input';
 import { Button } from '../ui/button';
 import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.auth)
  const [input,setInput] = React.useState({
    fullname:user?.fullname,
    email:user?.email,
    phonenumber:user?.phonenumber,
    bio:user?.profile?.bio,
    skills:user?.profile?.skills.join(','),
    file:user?.profile?.resume, 
  })

  const handleChange=(e)=>{
    setInput({...input,[e.target.name] : e.target.value})
  }
  const fileHandler=(e)=>{
    const file = e.target.files?.[0];
    setInput({...input,file})
  }
 
  const submitHandler=async(e)=>{
    dispatch(setLoading(true));
    e.preventDefault();
    const data = new FormData();
    data.append("fullname",input.fullname)
    data.append("email",input.email)
    data.append("phonenumber",input.phonenumber)
    data.append("bio",input.bio)
    data.append("skills",input.skills)
    if(input.file){
      data.append("file",input.file)
    }
    try{
       const res = await axios.post(`https://internify2.onrender.com/api/v1/user/profile/update`,data,{
        headers:{"Content-Type":'multipart/formadata'},
        withCredentials:true
       })
       if(res.data.success){
          dispatch(setUser(res.data.user))
          toast.success(res.data.message)
       }
    }
    catch(err){
       console.log(err)
       toast.error(err.response.data.message)
    }finally{
       dispatch(setLoading(false));
       navigate('/profile')
    }
 }


  return (
    <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right" >
         Full Name
        </Label>
        <Input
          name="fullname"
          Value={input.fullname}
          className="col-span-3"
          onChange = {handleChange}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Email
        </Label>
        <Input
          name="email"
          Value={input.email}
          className="col-span-3"
          onChange = {handleChange}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Phone Number
        </Label>
        <Input
          name="phonenumber"
          Value={input.phonenumber}
          className="col-span-3"
          onChange = {handleChange}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Bio
        </Label>
        <Input
          name="bio"
          Value={input.bio}
          className="col-span-3"
          onChange = {handleChange}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Skills
        </Label>
        <Input
          name="skills"
          Value={input.skills}
          className="col-span-3"
          onChange = {handleChange}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Resume:
        </Label>
        <Input
          type='file'
          name="file"
          id="file"
          className="col-span-3"
          accept="application/pdf"
          onChange = {fileHandler}
        />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit" className='w-full bg-[#147FE3]' onClick={submitHandler}>Save changes</Button>
    </DialogFooter>
  </DialogContent>
  );
}

export default EditProfile;
