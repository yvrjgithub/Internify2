import React from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
const CompanySet = () => {
  const params = useParams();
  useGetCompanyById(params.id)
  const [loading,setLoading] = React.useState(false)
  const navigate = useNavigate();
  const {singleCompany} = useSelector(store=>store.company)
  const ID = params.id;
    const [input,setInput] = React.useState({
      name: singleCompany.name,
      description: singleCompany.description,
      website: singleCompany.website,
      location: singleCompany.location,
      file:null
    })
    console.log(ID)
  const changeHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }
  const fileHandler=(e)=>{
    const file = e.target.files?.[0];
    setInput({...input,file})
  }
  const submitHandler=async(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)
    if(input.file){
      formData.append("file",input.file)
    }
    try {
      setLoading(true)
      const res = await axios.put(
        `https://internify2.onrender.com/api/v1/company/update/${ID}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/formdata',
            },
            withCredentials: true,
        }
    );
    if (res?.data?.success) {
      toast.success(res.data.message);
      navigate(`/admin/companies`);
  }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }
  React.useEffect(()=>{
    setInput({
      name: singleCompany.name ||'',
      description: singleCompany.description ||'',
      website: singleCompany.website ||'',
      location: singleCompany.location ||'',
      file:null
    })
  },[singleCompany])
  return (
    <div>
      <Navbar/>
      <div className='max-w-3xl my-10 mx-auto'>
        <form onSubmit={submitHandler}>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/admin/companies/create')} className='bg-[#CDE4E1]'>
                <ArrowLeft/>
                <span>Back</span>
              </Button>
              <h1 className='font-bold text-xl mx-10 '>Company Set-Up</h1>
              <p></p>
            </div>
            <br /><br /><br /><br />
            <div className='grid grid-cols-2 gap-4 my-3'>
              <Label>Company Name:</Label>
              <Input
              className=''
              type='text'
              name='name'
              value={input.name}
              onChange = {changeHandler}
              />
            </div>
            <div className='grid grid-cols-2 gap-4 my-3'>
              <Label>Company Description:</Label>
              <Input
              className=''
              type='text'
              name='description'
              value={input.description}
              onChange = {changeHandler}
              />
            </div>
            <div className='grid grid-cols-2 gap-4 my-3'>
              <Label>Company Website:</Label>
              <Input
              className=''
              type='text'
              name='website'
              value={input.website}
              onChange = {changeHandler}
              />
            </div>
            <div className='grid grid-cols-2 gap-4 my-3'>
              <Label>Company Location:</Label>
              <Input
              className=''
              type='text'
              name='location'
              value={input.location}
              onChange = {changeHandler}
              />
            </div>
            <div className='grid grid-cols-2 gap-4 my-3'>
              <Label>Company Logo:</Label>
              <Input
              className='bg-[#CDE4E1]'
              type='file'
              accept='image/*' 
              name="file"
              onChange={fileHandler} 
              />
            </div>
            {loading?
         <Button className='w-full bg-[#0778e1]'>
         <Loader2 className='animate-spin w-4 h-4'/>
         please wait
         </Button>:
            <Button type='submit' className='w-full bg-[#147FE3]'>Submit</Button>
}
        </form>
      </div>
    </div>
  );
}

export default CompanySet;
