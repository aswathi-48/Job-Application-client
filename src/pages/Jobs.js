import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Jobs(){
  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState('');
  useEffect(()=>{ load(); }, []);
  const load = async () => {
    try{
      const res = await API.get('/jobs');
      setJobs(res.data);
    }catch(err){ console.error(err) }
  }
  return (<div>
    <div className="navbar">Job Tracker</div>
    <div className="container">
      <h2>Jobs</h2>
      <div className="card">
        <input placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn" style={{marginLeft:8}} onClick={()=>{ /* simple client filter */ }}>Search</button>
      </div>
      <div style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:12}}>
        {jobs.map(j=>(
          <div className="card" key={j._id}>
            <h3 style={{color:'#6b21a8'}}>{j.title}</h3>
            <div style={{fontSize:13, color:'#666'}}>{j.company?.name} • {j.location} • {j.type}</div>
            <p>{j.description?.slice(0,200)}...</p>
            <div style={{marginTop:8}}>Skills: {j.skills?.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  </div>)
}
