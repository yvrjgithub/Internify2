import React from 'react';
import Navbar from './shared/Navbar';
import JobCard from './shared/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
const Browse = () => {
  useGetAllJobs()
  const dispatch = useDispatch()
  const {allJobs} = useSelector(store=>store.jobs)
    const jobs = [1,2,3,4,5,6,7,8,9,,12,3,4,5,6,]
    const {searchQuery} = useSelector(store=>store.jobs);
    const q = searchQuery
    React.useEffect(()=>{
      return ()=>{
        dispatch(setSearchQuery(""));
      }
    },[])
  return (
    <div>
      <Navbar/>
      <div className='w-11/12 mx-auto'>
      <h1 className='text-xl mt-4 font-medium'>Search results ({allJobs.length})</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-1'>
        {
             allJobs.map((job)=><JobCard key={job._id} job={job}/>)
        }
        </div>
        </div>
    </div>
  );
}

export default Browse;
