import React from 'react'
import Maincontent from './Maincontent'
import Subject from './admin/Subject'
import { Routes,Route,BrowserRouter } from "react-router-dom";
import AdminCategory from './admin/AdminCategory';
import AdminQuestions from './admin/AdminQuestions';
import Sections from './Sections';
import Questions from './Questions';
import "./App.css"
import AdminLogin from './admin/AdminLogin';
import ProtectedRoute from './ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div>
   <BrowserRouter>
   <Routes>
      <Route path={"/"} element={ <Maincontent />}/>
      <Route path={"/admin-login"} element={ <AdminLogin />}/>
      <Route path={"/student/sections/:id"} element={ <Sections />}/>
      <Route path={"/student/questions/:id"} element={ <Questions />}/>
      <Route path={"/admin/main"} element={ <ProtectedRoute><Subject /></ProtectedRoute>}/>
      <Route path={"/admin/category/:id"} element={ <ProtectedRoute><AdminCategory /></ProtectedRoute>}/>
      <Route path={"/admin/questions/:id"} element={<ProtectedRoute><AdminQuestions /></ProtectedRoute> }/>
      
     </Routes>
    
   </BrowserRouter>
   <ToastContainer />
    </div>
  )
}

export default App
