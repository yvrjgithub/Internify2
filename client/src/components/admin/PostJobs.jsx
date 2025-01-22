import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const PostJobs = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobtype: "",
        experience: "",
        positions: 0,
        companyId: ""
    });
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/company/get`, { withCredentials: true });
                console.log('API Response:', response.data);
                setCompanies(response.data.companies);
            } catch (error) {
                console.error('Error fetching companies:', error.response || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        console.log(input)
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Validate all required fields are filled
        if (!input.title || !input.description || !input.requirements || 
            !input.salary || !input.location || !input.jobtype || 
            !input.positions || !input.companyId || !input.experience) {
            toast.error("Please fill all required fields");
            return;
        }
    
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("requirements", input.requirements); // Make sure this is comma-separated in the input
        formData.append("salary", input.salary);
        formData.append("location", input.location);
        formData.append("jobtype", input.jobtype);
        formData.append("experience", input.experience);
        formData.append("positions", input.positions);
        formData.append("companyId", input.companyId);
    
        try {
            setLoading(true);
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/post`,
                input,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            if (res?.data?.success) {
                toast.success(res.data.message);
                navigate(`/admin/jobs`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Navbar />
            <div className='max-w-3xl my-10 mx-auto'>
                <form onSubmit={submitHandler}>
                    <div className="flex justify-between">
                        <Button variant="outline" onClick={() => navigate('/admin/companies/create')} className='bg-[#CDE4E1]'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl mx-10'>Post an Internship opportunity</h1>
                        <p></p>
                    </div>
                    <br /><br />
                    {/* Existing form fields */}
                    <div className="grid grid-cols-2 gap-4 my-3">
                        <Label>Title:</Label>
                        <Input
                            className="border-gray-600"
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-3">
                        <Label>Description:</Label>
                        <Input
                            className="border-gray-600"
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-3">
                        <Label>Requirements:</Label>
                        <Input
                            className="border-gray-600"
                            type="text"
                            name="requirements"
                            value={input.requirements}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-3">
                        <Label>Salary:</Label>
                        <Input
                            className="border-gray-600"
                            type="text"
                            name="salary"
                            value={input.salary}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-3">
                        <Label>Location:</Label>
                        <Input
                            className="border-gray-600"
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-3">
                        <Label>Job Type:</Label>
                        <Input
                            className="border-gray-600"
                            type="text"
                            name="jobtype"
                            value={input.jobtype}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-3">
                        <Label>Experience:</Label>
                        <Input
                            className="border-gray-600"
                            type="text"
                            name="experience"
                            value={input.experience}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-3">
                        <Label>Number of Positions:</Label>
                        <Input
                            className="border-gray-600"
                            type="number"
                            name="positions"
                            value={input.positions}
                            onChange={changeHandler}
                        />
                    </div>

                    {/* New Company Select field using regular HTML select */}
                    <div className="grid grid-cols-2 gap-4 my-3">
                        <Label>Select Company:</Label>
                        <select 
                            name="companyId"
                            value={input.companyId}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a company</option>
                            {companies.map((company) => (
                                <option key={company._id} value={company._id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {loading ? (
                        <Button className='w-full bg-[#0778e1]'>
                            <Loader2 className='animate-spin w-4 h-4' />
                            please wait
                        </Button>
                    ) : (
                        <Button type='submit' className='w-full bg-[#147FE3]'>Submit</Button>
                    )}
                    {companies.length === 0 ? (
                        <p className='text-red-500 text-xs mx-auto text-center font-bold my-3'>
                            *Please register a company before posting an opportunity
                        </p>
                    ) : null}
                </form>
            </div>
        </div>
    );
}

export default PostJobs;