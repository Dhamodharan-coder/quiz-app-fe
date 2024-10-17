import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Ensure this is imported
import DNS_NAME from '../dnsname';

const AdminCategory = () => {
    const [add, setadd] = useState(false);
    const { id } = useParams();
    const [categories, setCategories] = useState([]);

    const formik = useFormik({
        initialValues: {
            categorys: "",
            subjectids: ""
        },
        onSubmit: async (values) => {
            const finalValues = { ...values, subjectids: id };
            try {
                await axios.post(`${DNS_NAME}/admin/admin/category`, finalValues);
                toast.success("Created New Category");
                setadd(false);
            } catch (error) {
                console.error("Failed to Create", error);
                toast.error("Failed to Create");
            }
        }
    });

    const fetchCategories = async () => {
      try {
          const response = await axios.get(`${DNS_NAME}/admin/admin/category`); 
        
          const filtereddata = response.data.filter((e)=>(e.subjectids === id))
          setCategories(filtereddata);
      } catch (error) {
          console.error("Failed to fetch categories", error);
      }
  };

    const handledelete=async(id)=>{
      try {
        const result = confirm("Are You Sure");
        if(result){
          await axios.delete(`${DNS_NAME}/admin/admin/category/${id}`)
          toast.success("Deleted Successfully");
        }
      } catch (error) {
        console.error("There is an error",error);
        toast.error("Failed to Delete");
      }
        }
      
        const handleedit=async(id)=>{
      
        }


    useEffect(() => {
        fetchCategories();
    }, [categories]);

    return (
        <div>
            {add && (
                <div className='absolute z-10 bg-slate-500 bg-opacity-50 h-screen w-full flex items-center justify-center'>
                    <div className='bg-[rgb(249,229,205)] w-fit mx-auto rounded-xl'>
                        <div className='p-3 md:p-12 lg:p-12'>
                            <div className='cursor-pointer flex justify-end' onClick={() => { setadd(false) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="20px" fill="#000000">
                                    <path d="m251.33-198.29-53.04-53.04L426.96-480 198.29-708.67l53.04-53.04L480-533.04l228.67-228.67 53.04 53.04L533.04-480l228.67 228.67-53.04 53.04L480-426.96 251.33-198.29Z" />
                                </svg>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='pb-5'>
                                    <label htmlFor="categorys" className='font-bold my-4'>Enter the Topics:</label><br />
                                    <input
                                        id="categorys"
                                        type='text'
                                        placeholder='Enter the Topics'
                                        name='categorys'
                                        value={formik.values.categorys}
                                        onChange={formik.handleChange}
                                        className='p-2 w-80 border-2 border-[rgb(236,137,68)] focus:outline-none rounded-lg'
                                    />
                                    <div className='flex justify-center'>
                                        <button
                                            type='submit'
                                            className='mt-4 text-center bg-[rgb(236,137,68)] text-white p-3 rounded-lg'
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <Navbar />
            <Logout />
            <div className='m-10'>
                <div className='flex justify-between'>
                    <Link to={"/admin/main"} className='bg-[#652a01] p-2 rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
                            <path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z" />
                        </svg>
                    </Link>
                    <button className='bg-[#652a01] p-2 rounded-lg' onClick={() => setadd(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed">
                            <path d="M427.67-427.67H172v-104.66h255.67v-256.34h104.66v256.34h256.34v104.66H532.33V-172H427.67v-255.67Z" />
                        </svg>
                    </button>
                </div>
                {/* Categories List */}
                <div className='categories-list'>
                  {
                  categories ? (
                        <div> 
                              {categories.map((category,index) => (
                        <div key={index} className='bg-[#e2543c] p-8 mt-5 rounded-3xl text-white flex justify-between items-center'>
                            <div className='flex gap-2'>
                            <span className=' font-bold text-xl'>{index+1}.</span>
                              <div>
                              <h1 className='font-bold text-xl'>{category.categorys}</h1>
                              <span>120 Questions</span>
                              </div>
                            </div>
                            <div className='flex items-center gap-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{handleedit(category._id)}} className='cursor-pointer' height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{handledelete(category._id)}} className='cursor-pointer' height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/></svg>
      <Link to={`/admin/questions/${category._id}`} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M309.67-54.67 222-143l338.33-338.33L222-819.67 309.67-908l426.66 426.67L309.67-54.67Z"/></svg>
      </Link>
                            </div>
                        </div>
                    ))}
                        </div>
                    ):(
                        
                            <div key={index} className='bg-[#e2543c] p-8 mt-5 rounded-3xl text-white flex justify-between items-center'>
                            <span className=' font-bold text-xl'>No Lessons</span>
                            </div>
                        
                    )
                  }
                </div>
            </div>
        </div>
    );
};

export default AdminCategory;
