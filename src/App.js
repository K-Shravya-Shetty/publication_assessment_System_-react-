
/* import './App.css';
// import Dashboard from './components/Dashboard/Dashboard';
import LoginForm from './components/LoginForm/LoginForm';
// import NewApplication from './components/NewApplication/NewApplication';
// import Pcp from './components/Pcp/Pcp';



function App() {
  return (
   <div>
  <LoginForm/> 
     <NewApplication/> 
   <Dashboard/>
     </div>
  );
 }

export default App;*/


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import FacultyDash from './components/FacultyDash/FacultyDash';
import AdminDash from './components/AdminDash/AdminDash';
import NewApplication from './components/NewApplication/NewApplication';
import LoginForm from './components/LoginForm/LoginForm';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/newApplication" element={<NewApplication />} />
      <Route path="/LoginForm" element={<LoginForm />} />
      <Route path="/facultyDash" element={<FacultyDash />} /> 
      <Route path="/AdminDash" element={<AdminDash />} /> 
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default App;