import React, { useState, useEffect } from 'react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const Applications = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleAdJobs=(id)=>{
    navigate(`/description/${id}`)
  }
  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        // Fetch applications
        const appResponse = await fetch(`https://internify2.onrender.com/api/v1/application/get`, {
          credentials: 'include'
        });
        const appData = await appResponse.json();
        
        // For each application, fetch its job details
        const appsWithJobs = await Promise.all(
          appData.applications.map(async (app) => {
            try {
              const jobResponse = await fetch(`https://internify2.onrender.com/api/v1/job/get/${app.job}`, {
                credentials: 'include'
              });
              const jobData = await jobResponse.json();
              return {
                ...app,
                jobDetails: jobData
              };
            } catch (error) {
              console.error(`Error fetching job details for job ${app.job}:`, error);
              return {
                ...app,
                jobDetails: null
              };
            }
          })
        );
        
        setApps(appsWithJobs);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  if (loading) {
    return <div className="w-11/12 md:w-9/12 mx-auto">Loading...</div>;
  }
  console.log(apps)
  return (
    <div className="w-11/12 md:w-9/12 mx-auto">
      <Table className="no-scrollbar">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Intern Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-visible">
          {apps.map((app) => (
            <TableRow key={app._id} className="h-11 hover:bg-[#CDE4E1]"
            onClick={()=>handleAdJobs(app.job)}>
              <TableCell className="font-medium">
                {new Date(app.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {app.jobDetails?.job?.title || 'Loading...'}
              </TableCell>
              <TableCell>
                {app.jobDetails?.job?.companyId?.name || 'Loading...'}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  className="bg-blue-700 h-6 rounded-full shadow-inner p-2 font-semibold text-white" 
                  variant="outline"
                >
                  {app.status || 'Pending'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter />
      </Table>
    </div>
  );
};

export default Applications;