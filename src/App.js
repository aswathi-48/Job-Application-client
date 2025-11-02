import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import Admin from './pages/AdminDashboard';
import Navbar from './pages/Navbar';

function App(){
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  function Protected({ children, adminOnly }){
    if(!user) return <Navigate to="/login" replace />;
    if(adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;
    return children;
  }
  return (
    <BrowserRouter>
    <Navbar /> 
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/jobs" element={<Protected><Jobs/></Protected>} />
        <Route path="/admin" element={<Protected adminOnly={true}><Admin/></Protected>} />
        <Route path="/" element={<Navigate to="/jobs" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
