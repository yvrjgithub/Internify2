import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Companies = () => {
    const [input, setInput] = useState('');
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`https://internify2.onrender.com/api/v1/company/get`, { withCredentials: true });
                setCompanies(response.data.companies); // Update companies list
                setFilteredCompanies(response.data.companies); // Initialize filtered list
            } catch (error) {
                console.error('Error fetching companies:', error.response || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    // Filter companies based on the input value
    useEffect(() => {
        const lowerCaseInput = input.toLowerCase();
        const filtered = companies.filter((company) =>
            company.name.toLowerCase().includes(lowerCaseInput)
        );
        setFilteredCompanies(filtered);
    }, [input, companies]);

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between my-5">
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/companies/create')}>New Company</Button>
                </div>
                <CompaniesTable companies={filteredCompanies} loading={loading} />
            </div>
        </div>
    );
};

export default Companies;
