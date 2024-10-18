import React, { useEffect, useState } from 'react'
import hand from "./assets/hand-1.png"
import Navbar from "./Navbar"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import DNS_NAME from './dnsname'
const Maincontent = () => {
  const navigate = useNavigate();
  const [subjectdetail,setsubjectdetail] = useState([])
  const [name, setName] = useState("");
  const [loader,setloader]=useState(false);

  const formik = useFormik({
    initialValues: {
      name: ""
    },
    onSubmit: (values) => {
      // Store the formik values in session storage
      sessionStorage.setItem('name', JSON.stringify(values));
      setName(values.name); // Update the name state
    }
  });

  const subjectdetails =async()=>{
    setloader(true)
    const response = await axios.get(`${DNS_NAME}/student/student/subject`);
    setloader(false)
    setsubjectdetail(response.data);
      }
      

      useEffect(()=>{
        subjectdetails()
      },[])

  useEffect(() => {
    // Check if 'name' exists in sessionStorage
    const storedValues = sessionStorage.getItem('name');

    if (storedValues) {
      // Parse the stored values
      const parsedValues = JSON.parse(storedValues);
      // Access the 'name' value and update the state
      setName(parsedValues.name);
    } else {
      // No need to set a default value here since we handle that in the form
      setName(""); // Explicitly set to empty string for clarity
    }
  }, []); 

  return (
   <div>


{
  !name ? (<div className=' absolute z-10 bg-slate-500 bg-opacity-50 h-screen w-full  flex items-center justify-center'>
    <div className='bg-[rgb(249,229,205)] w-fit mx-auto rounded-xl'>
    <div className='p-3 md:p-12 lg:p-12'>
  <form onSubmit={formik.handleSubmit}>
  <div className='pb-5'>
   <h1 className='font-bold my-4'>Enter Your Name:</h1>
   <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} placeholder='Enter the name' className='p-2 border-2 border-[rgb(236,137,68)] w-80 focus:outline-none rounded-lg' />
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
     <div className='m-12'>
    <div className='border rounded-3xl text-[#652a01] p-6 mt-12 flex justify-between items-center flex-wrap'>
  <div>
    <div className='flex items-center flex-wrap image'>
      <img src={hand} alt='hand' className='w-12 md:w-14' />
      <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl'>Hello {name},</h1>
    </div>
    <div>
      <span className='text-xl md:text-2xl md:ms-8'>Great to See You!</span>
    </div>
  </div>
  <div className='rounded-full overflow-hidden'>
  <img src='https://i.pinimg.com/564x/21/d9/32/21d9324987c21f12863b8f1131f892ad.jpg' 
       className='rounded-full h-16 md:h-20 lg:h-20 w-16 md:w-20 lg:w-20 object-cover' 
       alt="Profile" />
</div>

</div>

   {
    !loader ? (<div>
      {
    subjectdetail.map((e,index)=>(
      <div className='bg-[rgb(236,137,68)] p-8 rounded-3xl text-white flex justify-between items-center my-4' key={index}>
      <div className='flex gap-2'>
      <span className=' font-bold text-xl'>{index+1}.</span>
<div>
<h1 className='font-bold text-xl'>{e.subject}</h1>
</div>
      </div>
      <Link to={`/student/sections/${e._id}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer'  height="25px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M309.67-54.67 222-143l338.33-338.33L222-819.67 309.67-908l426.66 426.67L309.67-54.67Z"/></svg>
       </Link>
         </div>
    ))
   }
    </div>):(<div className='flex justify-center'>
                                    <span className="loader"></span>
                                </div>)
   }

    </div>
   </div>
  )
}

export default Maincontent
