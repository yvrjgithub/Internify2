import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById = (compnayId) => {

      const dispatch = useDispatch();
    React.useEffect(()=>{
        const fetchSingleCompany=async()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/company/get/${compnayId}`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany()
    },[compnayId,dispatch])
}

export default useGetCompanyById;
