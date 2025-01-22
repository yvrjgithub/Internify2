import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCompanies } from '@/redux/companySlice';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/company/get`, {
                    withCredentials: true
                });
                
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.error('Error fetching companies:', error);
                // You might want to dispatch an error action here
            }
        };
        
        fetchCompanies();
    }, [dispatch]); // Added dispatch to dependency array
};

export default useGetAllCompanies;