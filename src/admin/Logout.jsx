import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate();
    function handlelogout(){
      const result = confirm("Are You Sure?");
    if(result){
      localStorage.removeItem('token');
      navigate("/admin-login");
      toast.success("Logged Out Successfully!")
    }
    }
  return (
    <div className='text-right mx-12'>
      <span className='bg-[#652a01] text-white p-1 sm:p-2 rounded-xl my-4' onClick={handlelogout}>Log Out</span>
    </div>
  )
}

export default Logout
