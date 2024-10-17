import React, { useState } from 'react';
import Navbar from '../Navbar';
import axios from "axios"
import DNS_NAME from '../dnsname.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${DNS_NAME}/admin/admin-login`, { email, password });
       // Log the response for debugging
        if (response.status === 200) { // Check if the response status is OK
          localStorage.setItem('token', response.data.token);
            toast.success("Login Successfully!");
            navigate("/admin/main");
        } else {
            toast.error("Login failed! Please check your credentials."); // Show an error message
        }
    } catch (error) {
        console.error('Error during login:', error); // Log any errors
        toast.error("Login failed! Please check your credentials."); // Show an error message
    }
};

  
  return (
   <div>
    <Navbar />
     <div className="min-h-screen flex items-center justify-center bg-[rgb(249,229,205)]">
      <div className="bg-[rgb(236,137,68)] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#652a01]">Admin Login</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-[#652a01]">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-[#652a01]">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
        
          
          <button
            type="submit"
            className="w-full bg-[#652a01] text-white font-bold py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
   </div>
  );
};

export default AdminLogin;
