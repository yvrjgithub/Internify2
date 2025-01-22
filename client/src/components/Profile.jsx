import React from 'react';
import Navbar from './shared/Navbar';
import { Avatar,AvatarImage} from '@radix-ui/react-avatar';
import { Edit,Contact,Mail,Phone,Link2, Link2Icon } from 'lucide-react';
import { Button } from './ui/button';
import Applications from './shared/Applications';
import EditProfile from './shared/EditProfile';
import { Dialog,DialogTrigger } from './ui/dialog';
import { useSelector } from 'react-redux';

const Profile = () => {
    const {user} = useSelector(store=>store.auth)
    const skills = user?.profile?.skills
    const resume = user?.profile?.resume
  return (
    <div>
    <Navbar/>
    <div className='w-11/12 md:w-9/12 border-gray-400 mx-auto border rounded-lg'>
    <div className='flex justify-between'>
        <div className='flex gap-8 m-2 md:m-8'>
        <Avatar className='cursor-pointer'><AvatarImage src={user.profile.profilePhoto} alt='user' className='h-16 w-16 rounded-full'/></Avatar>
        <div>
        <h2 className='text-2xl font-medium mt-2'>{user?.fullname}</h2>
        <h2 className='text-muted-foreground text-lg'>{user?.profile?.bio}</h2>
        </div>
        </div>
        <Dialog>
        <DialogTrigger>
        <Edit className='m-8'/>
        </DialogTrigger>
        <EditProfile/>
        </Dialog>
    </div>
    <div className='flex mx-6 gap-4 md:mx-9'>
    <Mail/>
    <p className='text-l mb-4'>{user?.email}</p>
    </div>
    <div className='flex mx-6 gap-4 md:mx-9'>
    <Phone/>
    <p className='text-l mb-4'>{user?.phonenumber}</p>
    </div>
    <p className='mx-6 mb-2 text-xl font-semibold md:mx-9' >Skills:</p>
    <div className='mx-6 mb-4 md:mx-9'>
    {skills?.map((data,index)=>(
        <Button className="bg-[#CDE4E1] h-6 rounded-full shadow-inner p-2 font-bold mx-1" variant="outline">{data}</Button>
    ))}
    </div>
    <p className='mx-6 md:mx-9 text-xl font-semibold'>Resume:</p>
    {resume?
    <div className='flex mx-7  md:mx-10 mb-4'>
    <Link2 size={20} className='mt-1' color='blue'/>
    <h1 className='text-l text-blue-500 mx-1 cursor-pointer'><a href={user.profile.resume}>{user.profile.resumeName.split(".")[0]}</a></h1></div>
    :
    <h1 className='text-l cursor-pointer mx-7'><a>Upload you resume in edit section</a></h1>
    }
    </div>
    <div className='w-11/12 md:w-9/12 mx-auto my-4'>
    <p className='text-xl font-semibold'>Your Applications</p>
    </div>
    <Applications/>
    </div>
  );
}

export default Profile;
