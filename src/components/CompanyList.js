

import React, { useEffect, useState } from "react";
import API from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:7000";

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
toast.error("Failed to fetch companies");    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleOpenModal = (company = null) => {
    if (company) {
      setEditId(company._id);
      setName(company.name);
      setDescription(company.description);
      setWebsite(company.website);
      setLogoPreview(company.logo ? `${API_URL}${company.logo}` : null);
    } else {
      setEditId(null);
      setName("");
      setDescription("");
      setWebsite("");
      setLogo(null);
      setLogoPreview(null);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("website", website);
    if (logo) formData.append("logo", logo);

    const token = localStorage.getItem("token");

    try {
      if (editId) {
        // Edit
        await API.patch(`/companies/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        toast.success("Company updated successfully!");
      } else {
        // Add
        await API.post("/companies", formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
         toast.success("Company added successfully!");
      }

      fetchCompanies();
      handleCloseModal();
    } catch (err) {
      console.error(err);
toast.error(err.response?.data?.message || "Failed to save company");    }
  };

 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this company?")) return;
  try {
    const token = localStorage.getItem("token");
    await API.delete(`/companies/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    toast.success("Company deleted successfully!");
    fetchCompanies(); 
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to delete company");
  }
};


  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#6b3fa0", textAlign: "center", marginBottom: "20px" }}>
        Company Management
      </h2>

      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button
          onClick={() => handleOpenModal()}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6b3fa0",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
         + Add Company
        </button>
      </div>

      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              maxWidth: "90%",
              position: "relative",
            }}
          >
            <h3 style={{ marginBottom: "15px", color: "#6b3fa0" }}>
              {editId ? "Edit Company" : "Add Company"}
            </h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
              <input
                type="text"
                placeholder="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
              <input type="file" accept="image/*" onChange={handleLogoChange} />
              {logoPreview && (
                <img src={logoPreview} alt="preview" width={80} height={80} style={{ borderRadius: "8px" }} />
              )}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    background: "#f0f0f0",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 12px",
                    borderRadius: "5px",
                    border: "none",
                    background: "#6b3fa0",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <thead style={{ background: "#ede4ff" }}>
          <tr>
            <th style={{ padding: "12px" }}>Logo</th>
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Description</th>
            <th style={{ padding: "12px" }}>Website</th>
            <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((c) => (
              <tr key={c._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <img
                    src={c.logo ? `${API_URL}${c.logo}` : `${API_URL}/uploads/default.png`}
                    alt={c.name}
                    width={60}
                    height={60}
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  />
                </td>
                <td style={{ padding: "10px", fontWeight: "500" }}>{c.name}</td>
                <td style={{ padding: "10px" }}>{c.description}</td>
                <td style={{ padding: "10px" }}>
                  <a href={c.website} target="_blank" rel="noreferrer">
                    {c.website}
                  </a>
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <button
                    onClick={() => handleOpenModal(c)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#6b3fa0",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    ✏️Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#ff4d4f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: "20px", textAlign: "center" }}>
                No companies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

