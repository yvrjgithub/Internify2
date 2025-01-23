import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';
const Hero = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [query,setQuery] = useState("")
  const handleSearch=()=>{
    dispatch(setSearchQuery(query))
    navigate('/browse')
  }
  return (
    <div className=' text-center my-12'>
        <div className='text-center w-6/12 bg-[#CDE4E1] mx-auto rounded-full sm:w-6/12 md:w-3/12'><h1 className='text-xl'>No.1 Internship Portal</h1></div>
        <div className='my-8'><h2 className='mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl'>Search , Apply &</h2>
        <h2 className='mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl'>Get your dream <span className='text-[#147fe3]'>Internship</span></h2>
         <h2 className='text-[#63696E] my-8 text-l mx-4 sm:mx-20 md:mx-56 '> Discover countless internship opportunities tailored to your skills and passions. Start your journey toward professional growth today, and take the first step in building your dream career.</h2>
        </div>
        <div className='flex justify-center my-8'>
        <Input className='w-8/12 shadow-md h-10 rounded-full rounded-tr-none rounded-br-none text-xl md:6/12'
        placeholder="Find your dream internship..."
        onChange={(e)=>setQuery(e.target.value)}
        ></Input>

        <Button className='h-10 shadow-md rounded-none rounded-tr-full rounded-br-full bg-[#147fe3]' onClick={handleSearch}><Search/></Button>
        </div>
    </div>
    );
}

export default Hero;
