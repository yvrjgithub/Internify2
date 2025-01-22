import React from 'react';
import { Button } from '../ui/button';
import { Book, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  
  const handleDetails = () => {
    navigate('/description/' + job._id);
  };

  const daysAgo = (mongoDbTime) => {
    if (!mongoDbTime) return 'Date unavailable';
    
    const today = new Date();
    const jobDay = new Date(mongoDbTime);
    const diff = today - jobDay;
    const ans = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (ans > 30 && ans < 365) {
      return Math.floor(ans / 30) + " Months ago";
    }
    if (ans >= 365) {
      return Math.floor(ans / 365) + " Years ago";
    }
    if (ans === 0) {
      return 'Today';
    }
    return ans + " Days ago";
  };

  // Early return if job data is not available
  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3/12 p-6 border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 h-[19rem]">
      <div className="flex w-full mx-2 justify-between mb-2">
        <p className="text-gray-500">{daysAgo(job.createdAt)}</p>
        <Bookmark />
      </div>
      <div className="flex gap-3 mb-2">
        <img
          src={job.companyId.logo}
          alt="company logo"
          className="w-12 h-12"
        />
        <div>
          <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {job.companyId?.name || 'Company Name Not Available'}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {job.location || 'Location Not Available'}
          </p>
        </div>
      </div>
      <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {job.title || 'Job Title Not Available'}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {job.description ? `${job.description.slice(0, 39)}...` : 'No description available'}
      </p>
      <Button className="bg-[#CDE4E1] h-6 rounded-full shadow-inner p-2 font-bold text-blue-700 mx-1" variant="outline">
        {job.positions || 'N/A'}
      </Button>
      <Button className="bg-[#CDE4E1] h-6 rounded-full shadow-inner p-2 text-red-700 font-bold mx-1" variant="outline">
        {job.jobtype || 'N/A'}
      </Button>
      <Button className="bg-[#CDE4E1] h-6 rounded-full shadow-inner p-2 font-bold mx-1" variant="outline">
        {job.salary ? `${job.salary}` : 'Salary N/A'}
      </Button>
      <div className="my-2 mt-4">
        <Button variant="outline" onClick={handleDetails}>
          Details
        </Button>
        <Button className="mx-4 bg-[#147FE3]">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default JobCard;