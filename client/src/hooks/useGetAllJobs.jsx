import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAllJobs } from '@/redux/jobSlice';
import { useSelector } from 'react-redux';
const useGetAllJobs = () => {
    const {searchQuery} = useSelector(store=>store.jobs);
    const dispatch = useDispatch();
    React.useEffect(()=>{
        const fetchAllJobs=async()=>{
            try {
                const res = await axios.get(`https://internify2.onrender.com/api/v1/job/get?keyword=${searchQuery}`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs()
    },[])
}

export default useGetAllJobs;
