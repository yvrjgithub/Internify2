import React from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const dispatch = useDispatch();

    const registerCompany = async () => {
        if (!name) {
            toast.error("Company name is required!");
            return;
        }

        try {
            const res = await axios.post(
                `http://localhost:5000/api/v1/company/register`,
                { companyName:name },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const id = res?.data?.company?._id;
                navigate(`/admin/companies/${id}`);
            }
        } catch (error) {
            console.log("Error:", error.response?.data || error.message);
            toast.error("Failed to register company. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <div className="my-10">
                    <p className="font-bold text-2xl">Your Company Name</p>
                    <p className="text-gray-500">
                        What would you like to name your company? You can change this later.
                    </p>
                </div>
                <Label>Company Name</Label>
                <Input
                    className="my-2"
                    type="text"
                    placeholder="xyz limited.."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="flex items-center gap-2 my-10">
                    <Button variant="outline" onClick={() => navigate('/admin/companies')}>
                        Cancel
                    </Button>
                    <Button className="mx-4 bg-[#147FE3]" onClick={registerCompany}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
