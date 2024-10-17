import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios';
import DNS_NAME from './dnsname';

const Sections = () => {
    const [add,setadd]=useState(false);
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchCategories = async () => {
      try {
          const response = await axios.get(`${DNS_NAME}/student/student/category`); 
          const filtereddata = response.data.filter((e)=>(e.subjectids === id))
          setCategories(filtereddata);
         
        } catch (error) {
          console.error("Failed to fetch categories", error);
      }
  };


  const handlenextpage=(id)=>{
    const result =confirm("Start the Test?")
    if(result){
     navigate(`/student/questions/${id}`)
    }
  }

  useEffect(()=>{
    fetchCategories();
  },[categories])
  return (
    <div>
      <div>
           {/* add input */}
{
  add ? (<div className=' absolute z-10 bg-slate-500 bg-opacity-50 h-screen w-full  flex items-center justify-center'>
    <div className='bg-[rgb(249,229,205)] w-fit mx-auto rounded-xl'>
    <div className='p-3 md:p-12 lg:p-12'>
      <div className='cursor-pointer flex justify-end' onClick={()=>{setadd(false)}}> <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="m251.33-198.29-53.04-53.04L426.96-480 198.29-708.67l53.04-53.04L480-533.04l228.67-228.67 53.04 53.04L533.04-480l228.67 228.67-53.04 53.04L480-426.96 251.33-198.29Z"/></svg>
      </div>
   <div className='pb-5'>
   <h1 className='font-bold my-4'>Enter the Subject:</h1>
   <input type='text' placeholder='Enter the Subject' className='p-2 border-2 border-[rgb(236,137,68)] w-80 focus:outline-none rounded-lg' />
   <div className='flex justify-center'>
   <button className='mt-4 text-center bg-[rgb(236,137,68)] text-white p-3 rounded-lg' onClick={()=>{setadd(false)}}>Add</button>
   </div>
   
   </div>
    </div>
    </div>
  </div>
  ):("")
}
      <Navbar />
      
      <div className='m-12'>
   


{/* list */}
    {
      categories.map((e,index)=>{
      return  <div  className='bg-[#dc5139] p-8 rounded-3xl text-white flex justify-between items-center' key={index}>
           <div className='flex gap-2'>
           <span className=' font-bold text-xl'>{index+1}.</span>
<div>
<h1 className='font-bold text-xl'>{e.categorys}</h1>
</div>
           </div>
<div className='flex items-center gap-0 sm:gap-3'>
<div onClick={()=>handlenextpage(e._id)} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M309.67-54.67 222-143l338.33-338.33L222-819.67 309.67-908l426.66 426.67L309.67-54.67Z"/></svg>
</div>
</div>
    </div>
      })
    }

    </div>
    </div>
    </div>
  )
}

export default Sections
