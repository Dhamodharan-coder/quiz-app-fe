import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import hand from "../assets/hand-1.png"
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { useFormik } from 'formik';
import axios from "axios"
import DNS_NAME from '../dnsname'
import { toast } from 'react-toastify'

const Subject = () => {
  const [add,setadd] = useState(false);
  const [subjectdetail,setsubjectdetail]=useState([]);
 

  const formik = useFormik({
initialValues:{
  subjects: " ",
},
onSubmit: async (values)=>{
  try {
    await axios.post(`${DNS_NAME}/admin/admin/subject`,values)
toast.success("Created New Subject")
setadd(false)
  } catch (error) {
    console.error("something went wrong",error);
    toast.error("Fail to Created");
  }
}
  })
  

  const subjectdetails =async()=>{
const response = await axios.get(`${DNS_NAME}/admin/admin/subject`);
setsubjectdetail(response.data);
  }

  const handledelete=async(id)=>{
try {
  const result = confirm("Are You Sure");
  if(result){
    await axios.delete(`${DNS_NAME}/admin/admin/subject/${id}`)
    toast.success("Deleted Successfully");
  }
} catch (error) {
  console.error("There is an error",error);
  toast.error("Failed to Delete");
}
  }

  const handleedit=async(id)=>{

  }


  useEffect(()=>{
subjectdetails();
  },[subjectdetail])

  return (
    <div>
           {/* add input */}
{
  add? (<div className=' absolute z-10 bg-slate-500 bg-opacity-50 h-screen w-full  flex items-center justify-center'>
    <div className='bg-[rgb(249,229,205)] w-fit mx-auto rounded-xl'>
    <div className='p-3 md:p-12 lg:p-12'>
      <div className='cursor-pointer flex justify-end' onClick={()=>{setadd(false)}}> <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="m251.33-198.29-53.04-53.04L426.96-480 198.29-708.67l53.04-53.04L480-533.04l228.67-228.67 53.04 53.04L533.04-480l228.67 228.67-53.04 53.04L480-426.96 251.33-198.29Z"/></svg>
      </div>
  <form onSubmit={formik.handleSubmit}>
  <div className='pb-5'>
   <h1 className='font-bold my-4'>Enter the Subject:</h1>
   <input type='text' name='subjects' value={formik.values.name} onChange={formik.handleChange} placeholder='Enter the Subject' className='p-2 border-2 border-[rgb(236,137,68)] w-80 focus:outline-none rounded-lg' />
   <div className='flex justify-center'>
  
<button type='submit' className='mt-4 text-center bg-[rgb(236,137,68)] text-white p-3 rounded-lg'>Add</button>
  
   </div>
   </div>
  </form>
    </div>
    </div>
  </div>
  ):("")
}



      <Navbar />
      <Logout />
      <div className='m-4 sm:m-12'>
    <div className='border rounded-3xl text-[#652a01] p-6 mt-12 flex justify-between items-center flex-wrap'>
  <div>
    <div className='flex items-center flex-wrap'>
      <img src={hand} alt='hand' className='w-8 sm:w-14 md:w-14' />
      <h1 className='font-bold text-xl sm:text-4xl md:text-4xl lg:text-5xl'>Hello Admin,</h1>
    </div>
    <div>
      <span className='text-xl sm:text-2xl md:text-2xl md:ms-8'>Great to See You!</span>
    </div>
  </div>
  <div className='rounded-full overflow-hidden'>
  <img src='https://i.pinimg.com/736x/32/a1/da/32a1da970e70c746a449b5cccabaeff5.jpg' 
       className='rounded-full h-16 md:h-20 lg:h-20 w-16 md:w-20 lg:w-20 object-cover' 
       alt="Profile" />
</div>
</div>

{/* add */}
<div className='text-right'>
  <button className=' bg-[#652a01] text-white p-2 sm:p-4 rounded-xl my-4' onClick={()=>{setadd(true)}}>
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M552.78-314.42h69.85v-88.98h89.62v-69.93h-89.62v-89.3h-69.85v89.22h-89.62v69.93h89.62v89.06ZM149.06-153.3q-31 0-53.38-22.72-22.38-22.71-22.38-53.04v-501.88q0-30.39 22.38-53.16 22.38-22.76 53.38-22.76h261.99l69.62 69.78h330.27q30.39 0 53.16 22.71 22.76 22.72 22.76 53.04v432.27q0 30.33-22.76 53.04-22.77 22.72-53.16 22.72H149.06Zm0-75.76h661.88v-432.27H449.25l-69.61-69.61H149.06v501.88Zm0 0v-501.88 501.88Z"/></svg></button>
</div>




{/* list */}
   {
  subjectdetail &&  subjectdetail.map((e,index)=>{
      return <div  className='bg-[rgb(236,137,68)] p-8 rounded-3xl text-white flex justify-between items-center my-4' key={index}>
      <div className='flex gap-2'>
        <span className='font-bold text-xl'>{index+1}.</span>
      <div>
      <h1 className='font-bold text-xl'>{e.subject}</h1>
      <span>2 Lessons</span>
      </div>
      </div>
      <div className='flex items-center gap-0 sm:gap-3'>
      <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{handleedit(e._id)}} className='cursor-pointer h-8 sm:h-18'  viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{handledelete(e._id)}} className='cursor-pointer h-8 sm:h-18'  viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/></svg>
      <Link to={`/admin/category/${e._id}`} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" className='h-8 sm:h-18 ' viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M309.67-54.67 222-143l338.33-338.33L222-819.67 309.67-908l426.66 426.67L309.67-54.67Z"/></svg>
      </Link>
      </div>
          </div>
    })
   }

    </div>
    </div>
  )
}

export default Subject
