import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { register, handleSubmit, reset, control, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      companyId: "",
      location: "",
      category: "",
      type: "",
       salary: "",
      skills: [],
    },
  });

  const selectedSkills = watch("skills");

  useEffect(() => {
    fetchJobs();
    fetchCompanies();
    fetchSkills();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSkillDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      toast.error("Failed to load jobs");
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data);
    } catch (err) {
      toast.error("Failed to load companies");
    }
  };

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/skills/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(res.data);
    } catch (err) {
      toast.error("Failed to load skills");
    }
  };

  const openDialog = (job = null) => {
    if (job) {
      setEditingJob(job);
      reset({
        title: job.title,
        description: job.description,
        companyId: job.company?._id || "",
        location: job.location || "",
        category: job.category || "",
        type: job.type || "",
         salary: job.salary || "",
        skills: job.skills?.map((s) => (s._id ? s._id : s)) || [],
      });
    } else {
      setEditingJob(null);
      reset({
        title: "",
        description: "",
        companyId: "",
        location: "",
        category: "",
        type: "",
        salary:"",
        skills: [],
      });
    }
    setShowDialog(true);
  };

  const toggleSkill = (id) => {
    const updated = selectedSkills.includes(id)
      ? selectedSkills.filter((s) => s !== id)
      : [...selectedSkills, id];
    setValue("skills", updated);
  };

  const onSubmit = async (data) => {
    try {
      if (editingJob) {
        await API.patch(`/jobs/${editingJob._id}`, data);
        toast.success("Job updated successfully!");
      } else {
        await API.post("/jobs", data);
        toast.success("Job added successfully!");
      }
      setShowDialog(false);
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving job");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await API.delete(`/jobs/${id}`);
        toast.success("Job deleted successfully!");
        fetchJobs();
      } catch {
        toast.error("Failed to delete job");
      }
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={2000} />
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
             <th style={styles.th}>Salary</th>
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
              <td style={styles.td}>{j.salary ? `₹${j.salary}` : "-"}</td> 
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

            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
              {/* Title + Description */}
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Title</label>
                  <input
                    style={styles.input}
                    {...register("title", { required: true })}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Description</label>
                  <input
                    style={styles.input}
                    {...register("description", { required: true })}
                  />
                </div>
              </div>

              {/* Company + Location */}
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Company</label>
                  <select
                    style={styles.input}
                    {...register("companyId", { required: true })}
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
                  <input style={styles.input} {...register("location")} />
                </div>
              </div>

              {/* Category + Type */}
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Category</label>
                  <input style={styles.input} {...register("category")} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Job Type</label>
                  <select style={styles.input} {...register("type")}>
                    <option value="">Select Type</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>
                <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Salary (₹)</label>
                  <input
                    type="number"
                    style={styles.input}
                    {...register("salary", { required: true })}
                  />
                </div>
              </div>

              {/* Skills Dropdown */}
              <div
                style={{ ...styles.field, position: "relative" }}
                ref={dropdownRef}
              >
                <label style={styles.label}>Required Skills</label>
                <div
                  style={styles.dropdownBox}
                  onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                >
                  <div
                    style={{
                      display: "inline-block",
                      maxWidth: "85%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      verticalAlign: "middle",
                    }}
                  >
                    {selectedSkills.length > 0
                      ? skills
                          .filter((s) => selectedSkills.includes(s._id))
                          .map((s) => s.name)
                          .join(", ")
                      : "Select Skills"}
                  </div>
                  <span style={{ float: "right" }}>▼</span>
                </div>

                {showSkillDropdown && (
                  <div style={styles.dropdownList}>
                    {skills.map((skill) => (
                      <div
                        key={skill._id}
                        style={{
                          ...styles.dropdownItem,
                          background: selectedSkills.includes(skill._id)
                            ? "#e6d7ff"
                            : "white",
                        }}
                        onClick={() => toggleSkill(skill._id)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill._id)}
                          readOnly
                        />
                        <span style={{ marginLeft: "8px" }}>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                )}
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

/* 💅 Styles */
const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  heading: { color: "#6b3fa0", textAlign: "center" },
  topBar: { display: "flex", justifyContent: "flex-end", marginBottom: "20px" },
  addBtn: {
    background: "#6b3fa0",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "10px", borderBottom: "2px solid #ccc" },
  td: { padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" },
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
  field: { flex: 1, display: "flex", flexDirection: "column", position: "relative" },
  label: { fontWeight: "bold", marginBottom: "5px", color: "#333" },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  dropdownBox: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
    userSelect: "none",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownList: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginTop: "5px",
    background: "#fff",
    maxHeight: "150px",
    overflowY: "auto",
    position: "absolute",
    zIndex: 10,
    width: "100%",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  },
  dropdownItem: {
    padding: "8px 10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
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
};
