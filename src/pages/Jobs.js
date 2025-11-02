
import React, { useEffect, useState } from "react";
import API from "../api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [q, setQ] = useState("");

  // Filter states
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  // Selected Job for details view
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  // Apply filters dynamically
  useEffect(() => {
    applyFilters();
  }, [q, jobType, minSalary, maxSalary, jobs]);

  const applyFilters = () => {
    let result = [...jobs];

    const searchTerm = q.toLowerCase().trim();
    if (searchTerm) {
      result = result.filter((job) => {
        const title = job.title?.toLowerCase() || "";
        const company = job.company?.name?.toLowerCase() || "";
        const location = job.location?.toLowerCase() || "";
        return (
          title.includes(searchTerm) ||
          company.includes(searchTerm) ||
          location.includes(searchTerm)
        );
      });
    }

    if (jobType) {
      result = result.filter(
        (job) => job.type?.toLowerCase() === jobType.toLowerCase()
      );
    }

    if (minSalary || maxSalary) {
      result = result.filter((job) => {
        const salary = job.salary || 0;
        if (minSalary && salary < parseInt(minSalary)) return false;
        if (maxSalary && salary > parseInt(maxSalary)) return false;
        return true;
      });
    }

    setFilteredJobs(result);
  };

  const clearFilters = () => {
    setQ("");
    setJobType("");
    setMinSalary("");
    setMaxSalary("");
  };

  return (
    <div>
      {/* <div className="navbar">Job Tracker</div> */}

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "20px",
          alignItems: "start",
          maxWidth: "100%",
          margin: "52px 41px",
        }}
      >
        {/* Filter Sidebar */}
        <div className="card" style={{ padding: "15px" }}>
          <h4>Filter Jobs</h4>

          <div style={{ marginTop: 10 }}>
            <label style={{ fontWeight: 600 }}>Job Type:</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
              }}
            >
              <option value="">All</option>
              <option value="Full-time">Full Time</option>
              <option value="Part-time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div style={{ marginTop: 10 }}>
            <label style={{ fontWeight: 600 }}>Salary Range (₹):</label>
            <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
              <input
                type="number"
                placeholder="Min"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                style={{ flex: 1, padding: "6px", width:"30px" }}
              />
              <input
                type="number"
                placeholder="Max"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                style={{ flex: 1, padding: "6px",width:"30px" }}
              />
            </div>
          </div>

          <button
            className="btn"
            onClick={clearFilters}
            style={{
              marginTop: 15,
              width: "100%",
              background: "#6b21a8",
              color: "white",
              padding: "8px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Clear Filters
          </button>
        </div>

        {/* Job List or Job Details */}
        <div>
          {!selectedJob ? (
            <>
              <h2>Jobs</h2>

              {/* Search Bar */}
              <div
                className="card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 12,
                  padding: "8px",
                }}
              >
                <input
                  placeholder="Search by title, company, or location"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  style={{ flex: 1, padding: "8px" }}
                />
              </div>

              {/* Job Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                  gap: 12,
                }}
              >
                {filteredJobs.length === 0 ? (
                  <div>No jobs found</div>
                ) : (
                  filteredJobs.map((j) => (
                    <div
                      className="card"
                      key={j._id}
                      style={{
                        cursor: "pointer",
                        transition: "0.2s",
                      }}
                      onClick={() => setSelectedJob(j)}
                    >
                      <h3 style={{ color: "#6b21a8" }}>{j.title}</h3>
                      <div style={{ fontSize: 13, color: "#666" }}>
                        {j.company?.name} • {j.location} • {j.type}
                      </div>
                      {j.salary && (
                        <div style={{ fontSize: 13, color: "#333" }}>
                          💰 Salary: ₹{j.salary}
                        </div>
                      )}
                      <p>{j.description?.slice(0, 150)}...</p>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            // ✅ Job Details Section
            <div className="card" style={{ padding: 20 }}>
              <button
                onClick={() => setSelectedJob(null)}
                style={{
                  marginBottom: 10,
                  background: "none",
                  border: "none",
                  color: "#6b21a8",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                ← Back to Jobs
              </button>

              <h2 style={{ color: "#6b21a8" }}>{selectedJob.title}</h2>
              <h4 style={{ color: "#444" }}>
                {selectedJob.company?.name} • {selectedJob.location}
              </h4>
              <p style={{ color: "#555" }}>{selectedJob.type}</p>

              {selectedJob.salary && (
                <p>
                  <strong>💰 Salary:</strong> ₹{selectedJob.salary}
                </p>
              )}

              <div style={{ marginTop: 15 }}>
                <h4>Job Description</h4>
                <p>{selectedJob.description}</p>
              </div>

              {Array.isArray(selectedJob.skills) && selectedJob.skills.length > 0 && (
                <div style={{ marginTop: 15 }}>
                  <h4>Skills Required</h4>
                  <ul>
                    {selectedJob.skills.map((s, i) => (
                      <li key={i}>{s.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                style={{
                  marginTop: 20,
                  background: "#6b21a8",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() =>
                  alert(`You applied for ${selectedJob.title} successfully!`)
                }
              >
                Apply Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
