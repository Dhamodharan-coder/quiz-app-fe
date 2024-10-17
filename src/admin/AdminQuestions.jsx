import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Logout from './Logout'
import { useFormik } from 'formik'
import DNS_NAME from '../dnsname'
import axios from 'axios'
import { toast } from 'react-toastify'


const AdminQuestions = () => {
    const [add,setadd]=useState(false)
    const [arrow,setarrow] = useState(false);
    const [question,setQuestion]=useState([])
    const{id} = useParams();

    const formik = useFormik({
      initialValues: {
          question: "",
          categoryid:"",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer:""
      },
      onSubmit: async (values) => {
          const finalValues = { ...values, categoryid: id };
          try {
              await axios.post(`${DNS_NAME}/admin/admin/question`, finalValues);
              toast.success("Created Question");
              setadd(false);
          } catch (error) {
              console.error("Failed to Create", error);
              toast.error("Failed to Create");
          }
      }
  });

  const handledelete=async(id)=>{
    try {
      const result = confirm("Are You Sure");
      if(result){
        await axios.delete(`${DNS_NAME}/admin/admin/question/${id}`)
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.error("There is an error",error);
      toast.error("Failed to Delete");
    }
      }
    

  
  const fetchQuestions = async () => {
    try {
        const response = await axios.get(`${DNS_NAME}/admin/admin/question`); 
       

        const filtereddata = response.data.filter((e)=>(e.categoryid === id))
        setQuestion(filtereddata);
    } catch (error) {
        console.error("Failed to fetch categories", error);
    }
};
const navigate = useNavigate()
const handleBackTwoSteps = () => {
  navigate(-1); // Go back two pages in the history stack
};

useEffect(()=>{
  fetchQuestions()
},[question])
  return (
    <div>

{
  add ? (<div className=' absolute z-10 bg-slate-500 bg-opacity-50 h-fit w-full  flex items-center justify-center'>
   <form onSubmit={formik.handleSubmit}>
   <div className='bg-[rgb(249,229,205)] w-fit mx-auto rounded-xl'>
    <div className='p-3 md:p-12 lg:p-12'>
      <div className='cursor-pointer flex justify-end' onClick={()=>{setadd(false)}}> <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="m251.33-198.29-53.04-53.04L426.96-480 198.29-708.67l53.04-53.04L480-533.04l228.67-228.67 53.04 53.04L533.04-480l228.67 228.67-53.04 53.04L480-426.96 251.33-198.29Z"/></svg>
      </div>
   <div className='pb-5'>
   <h1 className='font-bold my-4'>Enter the Question:</h1>
   <input type='text' name='question' onChange={formik.handleChange}  placeholder='Enter the Question' className='p-2  sm:w-96 border-2 border-[rgb(236,137,68)] focus:outline-none rounded-lg' />
   <h1 className='font-bold my-4'>Enter the Option1:</h1>
   <input type='text' name='option1' onChange={formik.handleChange} placeholder='Enter the Option1' className='p-2 sm:w-96 border-2 border-[rgb(236,137,68)] focus:outline-none rounded-lg' />
   
   <h1 className='font-bold my-4'>Enter the Option2:</h1>
   <input type='text' name='option2' onChange={formik.handleChange} placeholder='Enter the Option2' className='p-2 sm:w-96 border-2 border-[rgb(236,137,68)] focus:outline-none rounded-lg' />
   
   <h1 className='font-bold my-4'>Enter the Option3:</h1>
   <input type='text' name='option3' onChange={formik.handleChange} placeholder='Enter the Option3' className='p-2 sm:w-96 border-2 border-[rgb(236,137,68)] focus:outline-none rounded-lg' />
   
   <h1 className='font-bold my-4'>Enter the Option4:</h1>
   <input type='text' name='option4' onChange={formik.handleChange} placeholder='Enter the Option4' className='p-2 sm:w-96 border-2 border-[rgb(236,137,68)] focus:outline-none rounded-lg' />
   
   <h1 className='font-bold my-4'>Enter the Answer:</h1>
   <input type='text' name='answer' onChange={formik.handleChange} placeholder='Enter the Answer' className='p-2 sm:w-96 border-2 border-[rgb(236,137,68)] focus:outline-none rounded-lg' />
   
   <div className='flex justify-center'>
   <button type='submit' className='mt-4 text-center bg-[rgb(236,137,68)] text-white p-3 rounded-lg'>Add</button>
   </div>
   
   </div>
    </div>
    </div>
   </form>
  </div>
  ):("")
}
      <Navbar />
<Logout />

      <div className='m-10'>
   <div className='flex justify-between'>
     <div onClick={handleBackTwoSteps} className='bg-[#652a01] p-2 rounded-lg'>
     <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z"/></svg>
       </div>
   
   
     <button className='bg-[#652a01] p-2 rounded-lg' onClick={()=>(setadd(true))}>
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M427.67-427.67H172v-104.66h255.67v-256.34h104.66v256.34h256.34v104.66H532.33V-172H427.67v-255.67Z"/></svg></button>
     </div>
     



{/* list */}
{
  question.map((e,index)=>(
    <div key={index} className='bg-[#ec8944] p-8 mt-5  rounded-3xl text-white flex justify-between items-start'>
<div className='flex gap-3'>
<div> 
  <span className=' font-bold text-xl'>{index+1}.</span>
</div>
<div>
<h1 className='font-bold text-xl'>{e.question}</h1>
<div className={`m-5 ${!arrow && "hidden"}`}>
<input 
  type='radio' 
  className='my-2' 
  checked={e.answer === "1"} 
  disabled={e.answer !== "1"} 
/>
{e.option1}<br />
<input type='radio' className='my-2'   checked={e.answer === "2"} 
  disabled={e.answer !== "2"} /> {e.option2}<br />
<input type='radio' className='my-2'
  checked={e.answer === "3"} 
  disabled={e.answer !== "3"} /> {e.option3}<br />
<input type='radio' className='my-2'
  checked={e.answer === "4"} 
  disabled={e.answer !== "4"} /> {e.option4}<br />
</div>
   </div>
</div>
  
<div className='flex items-center gap-3'>
<svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer' height="30px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z"/></svg>

<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{handledelete(e._id)}} className='cursor-pointer' height="30px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/></svg>

{
    !arrow ? (<svg xmlns="http://www.w3.org/2000/svg" className=' cursor-pointer' height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF" onClick={()=>{setarrow(true)}}><path d="M480-545.33 287.33-352.67 240-400l240-240 240 240-47.33 47.33L480-545.33Z"/></svg>
    ):(<svg xmlns="http://www.w3.org/2000/svg" className=' cursor-pointer' height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF" onClick={()=>{setarrow(false)}}><path d="M480-344 240-584l47.33-47.33L480-438.67l192.67-192.66L720-584 480-344Z"/></svg>
    )
}
</div>
  </div>
  ))
}

  

    </div>
    </div>
  )
}

export default AdminQuestions
