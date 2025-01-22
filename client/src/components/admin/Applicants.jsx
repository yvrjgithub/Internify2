import React from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Popover, PopoverTrigger,PopoverContent } from '@radix-ui/react-popover';
import { MoreHorizontal,ThumbsUp,ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';
const Applicants = () => {
    const [input, setInput] = useState('');
    const [apps,setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();
    const idd = params.id;
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/application/${idd}/applicants`, { withCredentials: true });
                console.log('API Response:', response.data); // Log the full response
                setApps(response.data.job.applications); // Update companies list
                setFilteredCompanies(response.data.jobs); // Initialize filtered list
            } catch (error) {
                console.error('Error fetching companies:', error.response || error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    const statusHandler=async(status,id)=>{
        try{
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/application/${id}/status/update`,{status},{withCredentials:true});
            if(res.data.success){
                toast.success(res.data.message)
            }
        }
        catch(error){
            console.log(error);
        }
    }
  return (
    <div className='mx-2 md:mx-16 lg:mx-24'>
    <Navbar/>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Photo</th>
            <th className="px-4 py-2 border-b text-left">Full Name</th>
            <th className="px-4 py-2 border-b text-left">Email</th>
            <th className="px-4 py-2 border-b text-left">Phone</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
            <th className="px-4 py-2 border-b text-left">Action</th>
            <th className="px-4 py-2 border-b text-left">Resume</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <tr key={app._id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">
                <img
                  src={app.applicant.profile.profilePhoto}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="px-4 py-2 border-b">{app.applicant.fullname}</td>
              <td className="px-4 py-2 border-b">{app.applicant.email}</td>
              <td className="px-4 py-2 border-b">{app.applicant.phonenumber}</td>
              <td className="px-4 py-2 border-b">{app.status}</td>
              <td className='px-4 py-2 border-b'> 
              <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32  items-center p-2 bg-white">
                      <div className="flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-gray-100 rounded"
                      onClick={() => statusHandler('accepted', app._id)}>
                        <ThumbsUp/>
                        <span>Accept</span>
                      </div>
                      <div className="flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-gray-100 rounded"
                      onClick={() => statusHandler('rejected', app._id)}>
                        <ThumbsDown/>
                        <span>Decline</span>
                      </div>
                </PopoverContent>
                </Popover>
              </td>
              <td className="px-4 py-2 border-b">
                {app.applicant.profile.resume ? (
                  <a
                    href={app.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {app.applicant.profile.resumeName || "View Resume"}
                  </a>
                ) : (
                  "No Resume"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Applicants;
