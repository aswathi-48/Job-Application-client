// import React, { useEffect, useState } from "react";
// import API from "../api";

// export default function JobList() {
//   const [jobs, setJobs] = useState([]);
//   const [companies, setCompanies] = useState([]);

//   // form states
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [companyId, setCompanyId] = useState("");
//   const [location, setLocation] = useState("");
//   const [category, setCategory] = useState("");
//   const [type, setType] = useState("");
//   const [skills, setSkills] = useState([]);

//   // dialog visibility
//   const [showDialog, setShowDialog] = useState(false);

//   const availableSkills = [
//     "HTML",
//     "CSS",
//     "JavaScript",
//     "React",
//     "Node.js",
//     "Express",
//     "MongoDB",
//     "Python",
//     "Java",
//     "C++",
//   ];

//   const fetchJobs = async () => {
//     const res = await API.get("/jobs");
//     setJobs(res.data);
//   };

//   const fetchCompanies = async () => {
//     const res = await API.get("/companies");
//     setCompanies(res.data);
//   };

//   useEffect(() => {
//     fetchJobs();
//     fetchCompanies();
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/jobs", {
//         title,
//         description,
//         companyId,
//         location,
//         category,
//         type,
//         skills,
//       });

//       // reset
//       setTitle("");
//       setDescription("");
//       setCompanyId("");
//       setLocation("");
//       setCategory("");
//       setType("");
//       setSkills([]);

//       setShowDialog(false);
//       fetchJobs();
//     } catch (err) {
//       alert(err.response?.data?.message || "Add job failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this job?")) {
//       await API.delete(`/jobs/${id}`);
//       fetchJobs();
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Job Management</h2>

//       <div style={styles.topBar}>
//         <button style={styles.addBtn} onClick={() => setShowDialog(true)}>
//           + Add Job
//         </button>
//       </div>

//       <table style={styles.table}>
//         <thead style={{ background: "#ede4ff" }}>
//           <tr>
//             <th style={styles.th}>Title</th>
//             <th style={styles.th}>Description</th>
//             <th style={styles.th}>Company</th>
//             <th style={styles.th}>Location</th>
//             <th style={styles.th}>Category</th>
//             <th style={styles.th}>Type</th>
//             <th style={styles.th}>Skills</th>
//             <th style={styles.th}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobs.map((j) => (
//             <tr key={j._id} style={styles.tr}>
//               <td style={styles.td}>{j.title}</td>
//               <td style={styles.td}>{j.description}</td>
//               <td style={styles.td}>{j.company?.name}</td>
//               <td style={styles.td}>{j.location}</td>
//               <td style={styles.td}>{j.category}</td>
//               <td style={styles.td}>{j.type}</td>
//               <td style={styles.td}>{j.skills?.join(", ")}</td>
//               <td style={styles.td}>
//                 <button
//                   onClick={() => handleDelete(j._id)}
//                   style={styles.deleteBtn}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Dialog box */}
//       {showDialog && (
//         <div style={styles.overlay}>
//           <div style={styles.dialog}>
//             <h3 style={styles.dialogTitle}>Add New Job</h3>
//             <form onSubmit={handleAdd} style={styles.form}>
//               <div style={styles.row}>
//                 <div style={styles.field}>
//                   <label style={styles.label}>Title</label>
//                   <input
//                     style={styles.input}
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div style={styles.field}>
//                   <label style={styles.label}>Description</label>
//                   <input
//                     style={styles.input}
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <div style={styles.row}>
//                 <div style={styles.field}>
//                   <label style={styles.label}>Company</label>
//                   <select
//                     style={styles.input}
//                     value={companyId}
//                     onChange={(e) => setCompanyId(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Company</option>
//                     {companies.map((c) => (
//                       <option key={c._id} value={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Location</label>
//                   <input
//                     style={styles.input}
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div style={styles.row}>
//                 <div style={styles.field}>
//                   <label style={styles.label}>Category</label>
//                   <input
//                     style={styles.input}
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                   />
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Job Type</label>
//                   <select
//                     style={styles.input}
//                     value={type}
//                     onChange={(e) => setType(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Type</option>
//                     <option value="full-time">Full-Time</option>
//                     <option value="part-time">Part-Time</option>
//                     <option value="internship">Internship</option>
//                   </select>
//                 </div>
//               </div>

//               <div style={styles.field}>
//                 <label style={styles.label}>Required Skills</label>
//                 <select
//                   multiple
//                   style={styles.multiselect}
//                   value={skills}
//                   onChange={(e) =>
//                     setSkills(
//                       Array.from(e.target.selectedOptions, (opt) => opt.value)
//                     )
//                   }
//                 >
//                   {availableSkills.map((skill) => (
//                     <option key={skill} value={skill}>
//                       {skill}
//                     </option>
//                   ))}
//                 </select>
//                 <small style={{ color: "#555" }}>
//                   Hold Ctrl (Windows) or Cmd (Mac) to select multiple
//                 </small>
//               </div>

//               <div style={styles.btnRow}>
//                 <button type="submit" style={styles.saveBtn}>
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   style={styles.cancelBtn}
//                   onClick={() => setShowDialog(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: { padding: "20px", fontFamily: "Arial, sans-serif" },
//   heading: { color: "#6b3fa0", textAlign: "center" },
//   topBar: {
//     display: "flex",
//     justifyContent: "flex-end",
//     marginBottom: "20px",
//   },
//   addBtn: {
//     background: "#6b3fa0",
//     color: "white",
//     border: "none",
//     padding: "10px 18px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "10px", borderBottom: "2px solid #ccc" },
//   td: { padding: "10px", borderBottom: "1px solid #ddd" },
//   tr: { textAlign: "center" },
//   deleteBtn: {
//     background: "#ff4d4f",
//     color: "white",
//     border: "none",
//     padding: "5px 10px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     background: "rgba(0,0,0,0.5)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   dialog: {
//     background: "white",
//     padding: "25px",
//     borderRadius: "12px",
//     width: "600px",
//     maxHeight: "90vh",
//     overflowY: "auto",
//   },
//   dialogTitle: { textAlign: "center", color: "#6b3fa0", marginBottom: "15px" },
//   form: { display: "flex", flexDirection: "column", gap: "10px" },
//   row: { display: "flex", gap: "15px", flexWrap: "wrap" },
//   field: { flex: 1, display: "flex", flexDirection: "column" },
//   label: { fontWeight: "bold", marginBottom: "5px", color: "#333" },
//   input: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "14px",
//   },
//   multiselect: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     height: "100px",
//     fontSize: "14px",
//   },
//   btnRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "10px",
//   },
//   saveBtn: {
//     background: "#6b3fa0",
//     color: "white",
//     border: "none",
//     padding: "10px 18px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   cancelBtn: {
//     background: "#ccc",
//     border: "none",
//     padding: "10px 18px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
// };

// import React, { useEffect, useState } from "react";
// import API from "../api";

// export default function JobList() {
//   const [jobs, setJobs] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [availableSkills] = useState([
//     "HTML", "CSS", "JavaScript", "React", "Node.js",
//     "Express", "MongoDB", "Python", "Java", "C++",
//   ]);

//   // form states
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     companyId: "",
//     location: "",
//     category: "",
//     type: "",
//     skills: [],
//   });

//   const [editingJob, setEditingJob] = useState(null);
//   const [showDialog, setShowDialog] = useState(false);

//   useEffect(() => {
//     fetchJobs();
//     fetchCompanies();
//   }, []);

//   const fetchJobs = async () => {
//     const res = await API.get("/jobs");
//     setJobs(res.data);
//   };

//   const fetchCompanies = async () => {
//     const res = await API.get("/companies");
//     setCompanies(res.data);
//   };

//   const openDialog = (job = null) => {
//     if (job) {
//       setEditingJob(job);
//       setForm({
//         title: job.title,
//         description: job.description,
//         companyId: job.company?._id || "",
//         location: job.location || "",
//         category: job.category || "",
//         type: job.type || "",
//         skills: job.skills || [],
//       });
//     } else {
//       setEditingJob(null);
//       setForm({
//         title: "",
//         description: "",
//         companyId: "",
//         location: "",
//         category: "",
//         type: "",
//         skills: [],
//       });
//     }
//     setShowDialog(true);
//   };

//   const handleChange = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingJob) {
//         await API.patch(`/jobs/${editingJob._id}`, form);
//         alert("Job updated successfully!");
//       } else {
//         await API.post("/jobs", form);
//         alert("Job added successfully!");
//       }
//       setShowDialog(false);
//       fetchJobs();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error saving job");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this job?")) {
//       await API.delete(`/jobs/${id}`);
//       alert("Job deleted successfully!");
//       fetchJobs();
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Job Management</h2>

//       <div style={styles.topBar}>
//         <button style={styles.addBtn} onClick={() => openDialog()}>
//           + Add Job
//         </button>
//       </div>

//       <table style={styles.table}>
//         <thead style={{ background: "#ede4ff" }}>
//           <tr>
//             <th style={styles.th}>Title</th>
//             <th style={styles.th}>Description</th>
//             <th style={styles.th}>Company</th>
//             <th style={styles.th}>Location</th>
//             <th style={styles.th}>Category</th>
//             <th style={styles.th}>Type</th>
//             <th style={styles.th}>Skills</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobs.map((j) => (
//             <tr key={j._id} style={styles.tr}>
//               <td style={styles.td}>{j.title}</td>
//               <td style={styles.td}>{j.description}</td>
//               <td style={styles.td}>{j.company?.name}</td>
//               <td style={styles.td}>{j.location}</td>
//               <td style={styles.td}>{j.category}</td>
//               <td style={styles.td}>{j.type}</td>
//               <td style={styles.td}>{j.skills?.join(", ")}</td>
//               <td style={styles.td}>
//                 <button
//                   onClick={() => openDialog(j)}
//                   style={styles.editBtn}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(j._id)}
//                   style={styles.deleteBtn}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Dialog */}
//       {showDialog && (
//         <div style={styles.overlay}>
//           <div style={styles.dialog}>
//             <h3 style={styles.dialogTitle}>
//               {editingJob ? "Edit Job" : "Add New Job"}
//             </h3>
//             <form onSubmit={handleSubmit} style={styles.form}>
//               <div style={styles.row}>
//                 <div style={styles.field}>
//                   <label style={styles.label}>Title</label>
//                   <input
//                     style={styles.input}
//                     value={form.title}
//                     onChange={(e) => handleChange("title", e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div style={styles.field}>
//                   <label style={styles.label}>Description</label>
//                   <input
//                     style={styles.input}
//                     value={form.description}
//                     onChange={(e) =>
//                       handleChange("description", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//               </div>

//               <div style={styles.row}>
//                 <div style={styles.field}>
//                   <label style={styles.label}>Company</label>
//                   <select
//                     style={styles.input}
//                     value={form.companyId}
//                     onChange={(e) =>
//                       handleChange("companyId", e.target.value)
//                     }
//                     required
//                   >
//                     <option value="">Select Company</option>
//                     {companies.map((c) => (
//                       <option key={c._id} value={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div style={styles.field}>
//                   <label style={styles.label}>Location</label>
//                   <input
//                     style={styles.input}
//                     value={form.location}
//                     onChange={(e) => handleChange("location", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div style={styles.row}>
//                 <div style={styles.field}>
//                   <label style={styles.label}>Category</label>
//                   <input
//                     style={styles.input}
//                     value={form.category}
//                     onChange={(e) => handleChange("category", e.target.value)}
//                   />
//                 </div>
//                 <div style={styles.field}>
//                   <label style={styles.label}>Job Type</label>
//                   <select
//                     style={styles.input}
//                     value={form.type}
//                     onChange={(e) => handleChange("type", e.target.value)}
//                   >
//                     <option value="">Select Type</option>
//                     <option value="full-time">Full-Time</option>
//                     <option value="part-time">Part-Time</option>
//                     <option value="internship">Internship</option>
//                   </select>
//                 </div>
//               </div>

//               <div style={styles.field}>
//                 <label style={styles.label}>Required Skills</label>
//                 <select
//                   multiple
//                   style={styles.multiselect}
//                   value={form.skills}
//                   onChange={(e) =>
//                     handleChange(
//                       "skills",
//                       Array.from(e.target.selectedOptions, (opt) => opt.value)
//                     )
//                   }
//                 >
//                   {availableSkills.map((skill) => (
//                     <option key={skill} value={skill}>
//                       {skill}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.btnRow}>
//                 <button type="submit" style={styles.saveBtn}>
//                   {editingJob ? "Update" : "Save"}
//                 </button>
//                 <button
//                   type="button"
//                   style={styles.cancelBtn}
//                   onClick={() => setShowDialog(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: { padding: "20px", fontFamily: "Arial, sans-serif" },
//   heading: { color: "#6b3fa0", textAlign: "center" },
//   topBar: {
//     display: "flex",
//     justifyContent: "flex-end",
//     marginBottom: "20px",
//   },
//   addBtn: {
//     background: "#6b3fa0",
//     color: "white",
//     border: "none",
//     padding: "10px 18px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   editBtn: {
//     background: "#4caf50",
//     color: "white",
//     border: "none",
//     padding: "6px 10px",
//     borderRadius: "6px",
//     marginRight: "5px",
//     cursor: "pointer",
//   },
//   deleteBtn: {
//     background: "#ff4d4f",
//     color: "white",
//     border: "none",
//     padding: "6px 10px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "10px", borderBottom: "2px solid #ccc" },
//   td: { padding: "10px", borderBottom: "1px solid #ddd" },
//   tr: { textAlign: "center" },
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     background: "rgba(0,0,0,0.5)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   dialog: {
//     background: "white",
//     padding: "25px",
//     borderRadius: "12px",
//     width: "600px",
//     maxHeight: "90vh",
//     overflowY: "auto",
//   },
//   dialogTitle: { textAlign: "center", color: "#6b3fa0", marginBottom: "15px" },
//   form: { display: "flex", flexDirection: "column", gap: "10px" },
//   row: { display: "flex", gap: "15px", flexWrap: "wrap" },
//   field: { flex: 1, display: "flex", flexDirection: "column" },
//   label: { fontWeight: "bold", marginBottom: "5px", color: "#333" },
//   input: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "14px",
//   },
//   multiselect: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     height: "100px",
//     fontSize: "14px",
//   },
//   btnRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "10px",
//   },
//   saveBtn: {
//     background: "#6b3fa0",
//     color: "white",
//     border: "none",
//     padding: "10px 18px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   cancelBtn: {
//     background: "#ccc",
//     border: "none",
//     padding: "10px 18px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
// };

import React, { useEffect, useState } from "react";
import API from "../api";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    companyId: "",
    location: "",
    category: "",
    type: "",
    skills: [],
  });

  const [editingJob, setEditingJob] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchCompanies();
    fetchSkills();
  }, []);

  const fetchJobs = async () => {
    const res = await API.get("/jobs");
    setJobs(res.data);
  };

  const fetchCompanies = async () => {
    const res = await API.get("/companies");
    setCompanies(res.data);
  };

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/skills/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  const openDialog = (job = null) => {
    if (job) {
      setEditingJob(job);
      setForm({
        title: job.title,
        description: job.description,
        companyId: job.company?._id || "",
        location: job.location || "",
        category: job.category || "",
        type: job.type || "",
        skills: job.skills?.map((s) => (s._id ? s._id : s)) || [],
      });
    } else {
      setEditingJob(null);
      setForm({
        title: "",
        description: "",
        companyId: "",
        location: "",
        category: "",
        type: "",
        skills: [],
      });
    }
    setShowDialog(true);
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSkillChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    handleChange("skills", selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await API.patch(`/jobs/${editingJob._id}`, form);
        alert("Job updated successfully!");
      } else {
        await API.post("/jobs", form);
        alert("Job added successfully!");
      }
      setShowDialog(false);
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving job");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await API.delete(`/jobs/${id}`);
      alert("Job deleted successfully!");
      fetchJobs();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Job Management</h2>

      <div style={styles.topBar}>
        <button style={styles.addBtn} onClick={() => openDialog()}>
          + Add Job
        </button>
      </div>

      <table style={styles.table}>
        <thead style={{ background: "#ede4ff" }}>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Company</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Skills</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j._id} style={styles.tr}>
              <td style={styles.td}>{j.title}</td>
              <td style={styles.td}>{j.description}</td>
              <td style={styles.td}>{j.company?.name}</td>
              <td style={styles.td}>{j.location}</td>
              <td style={styles.td}>{j.category}</td>
              <td style={styles.td}>{j.type}</td>
              <td style={styles.td}>
                {Array.isArray(j.skills)
                  ? j.skills
                      .map((s) => (typeof s === "object" ? s.name : s))
                      .join(", ")
                  : ""}
              </td>
              <td style={styles.td}>
                <button onClick={() => openDialog(j)} style={styles.editBtn}>
                 ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(j._id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog Box */}
      {showDialog && (
        <div style={styles.overlay}>
          <div style={styles.dialog}>
            <h3 style={styles.dialogTitle}>
              {editingJob ? "Edit Job" : "Add New Job"}
            </h3>

            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Title + Description */}
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Title</label>
                  <input
                    style={styles.input}
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Description</label>
                  <input
                    style={styles.input}
                    value={form.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {/* Company + Location */}
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Company</label>
                  <select
                    style={styles.input}
                    value={form.companyId}
                    onChange={(e) => handleChange("companyId", e.target.value)}
                    required
                  >
                    <option value="">Select Company</option>
                    {companies.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Location</label>
                  <input
                    style={styles.input}
                    value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                </div>
              </div>

              {/* Category + Type */}
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Category</label>
                  <input
                    style={styles.input}
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Job Type</label>
                  <select
                    style={styles.input}
                    value={form.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Skills Dropdown */}
              <div style={styles.field}>
                <label style={styles.label}>Required Skills</label>
                <select
                  multiple
                  style={styles.multiselect}
                  value={form.skills}
                  onChange={handleSkillChange}
                >
                  {skills.map((skill) => (
                    <option key={skill._id} value={skill._id}>
                      {skill.name}
                    </option>
                  ))}
                </select>
                <small style={{ color: "#555" }}>
                  Hold Ctrl (Windows) or Cmd (Mac) to select multiple
                </small>
              </div>

              <div style={styles.btnRow}>
                <button type="submit" style={styles.saveBtn}>
                  {editingJob ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => setShowDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  heading: { color: "#6b3fa0", textAlign: "center" },
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
  },
  addBtn: {
    background: "#6b3fa0",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  editBtn: {
    background: "#6b3fa0",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "10px", borderBottom: "2px solid #ccc" },
  td: { padding: "10px", borderBottom: "1px solid #ddd" },
  tr: { textAlign: "center" },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dialog: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    width: "600px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  dialogTitle: { textAlign: "center", color: "#6b3fa0", marginBottom: "15px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  row: { display: "flex", gap: "15px", flexWrap: "wrap" },
  field: { flex: 1, display: "flex", flexDirection: "column" },
  label: { fontWeight: "bold", marginBottom: "5px", color: "#333" },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  multiselect: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    height: "120px",
    fontSize: "14px",
  },
  btnRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  saveBtn: {
    background: "#6b3fa0",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cancelBtn: {
    background: "#ccc",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
