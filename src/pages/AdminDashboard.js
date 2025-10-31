// import React from 'react';
// import API from '../api';

// export default function AdminDashboard(){
//   const logout = ()=>{ localStorage.removeItem('user'); localStorage.removeItem('token'); window.location.href='/login'; }
//   return (<div>
//     <div className="navbar">Admin Dashboard <button onClick={logout} style={{float:'right', background:'transparent', border:'1px solid rgba(255,255,255,0.2)', color:'white', padding:'6px 8px', borderRadius:6}}>Logout</button></div>
//     <div className="container">
//       <h2>Admin</h2>
//       <p className="card">Use API endpoints to manage companies and jobs. Server routes: <code>/api/companies</code> and <code>/api/jobs</code></p>
//     </div>
//   </div>)
// }

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import UserList from "../components/UserList";
import CompanyList from "../components/CompanyList";
import JobList from "../components/JobList";
import Profile from "../components/Profile";
import SkillManager from "../components/SkillManager";
import DashboardHome from "../components/DashboardHome";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard"); 

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9f8ff" }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />

      <div style={{ flex: 1, padding: "20px" }}>
        {activeTab === "dashboard" && <DashboardHome />}
        {activeTab === "profile" && <Profile />}
        {activeTab === "users" && <UserList />}
        {activeTab === "companies" && <CompanyList />}
        {activeTab === "jobs" && <JobList />}
        {activeTab === "skills" && <SkillManager />}
      </div>
    </div>
  );
}
