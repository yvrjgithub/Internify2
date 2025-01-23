import React from 'react';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setJob } from '@/redux/jobSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const Description = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { job } = useSelector(store => store.jobs);
  const { user } = useSelector(store => store.auth);

  const applyHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/application/apply`,
        { job: jobId },  // Send jobId in request body
        { withCredentials: true }
      );
      
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  React.useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/job/get/` + `${jobId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchJob();
  }, [jobId, dispatch]);

  const applied = job?.applications?.some(app => app.applicant == user?._id);

  return (
    <div>
      <Navbar />
      <div className='w-11/12 md:w-9/12 mx-auto border-gray-200 border rounded-lg'>
        <p className='text-2xl font-semibold m-4'>{job.title}</p>
        <div className='m-4'>
          <Button className="h-6 rounded-full shadow-inner p-2 font-bold text-blue-700 mx-1" variant="outline">
            {job.positions} Positions
          </Button>
          <Button className="h-6 rounded-full shadow-inner p-2 text-red-700 font-bold mx-1" variant="outline">
            {job.jobtype}
          </Button>
          <Button className="h-6 rounded-full shadow-inner p-2 font-bold mx-1" variant="outline">
            {job.salary}
          </Button>
        </div>
        <p className='text-l font-medium text-muted-foreground m-4'>
          {job.description}
        </p>
        <hr className='m-4' />
        <div className='flex m-4 my-1'>
          <p className='font-semibold'>Role:</p>
          <p className='mx-2'>{job.title}</p>
        </div>
        <div className='flex m-4 my-1'>
          <p className='font-semibold'>Location:</p>
          <p className='mx-2'>{job.location}</p>
        </div>
        <div className='flex m-4 my-1'>
          <p>
            <span className='font-semibold'>Requirements: </span>
            {job?.requirements?.join(' , ')}
          </p>
        </div>
        <div className='flex m-4 my-1'></div>
        <div className='flex m-4 my-1'>
          <p className='font-semibold'>Total Applicants:</p>
          <p className='mx-2'>{job?.applications?.length}</p>
        </div>
        <div className='flex m-4 my-1'>
          <p className='font-semibold'>Posted Date:</p>
          <p className='mx-2'>{job?.createdAt?.slice(0, 10)}</p>
        </div>
        {!applied ? (
          <Button className='bg-blue-500 m-4' onClick={applyHandler}>
            Apply Now
          </Button>
        ) : (
          <Button className='bg-gray-400 m-4 hover:bg-gray-400'>
            Already Applied
          </Button>
        )}
      </div>
    </div>
  );
}

export default Description;