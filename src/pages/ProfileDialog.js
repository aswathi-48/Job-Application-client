import React, { useEffect, useState } from "react";
import API from "../api"; // axios instance with token header

export default function ProfileDialog({ onClose }) {
  const [user, setUser] = useState({ name: "", email: "", phone: "", skills: "" });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    API.get("/auth/profile")
      .then((res) => {
        setUser({
          ...res.data,
          skills: res.data.skills ? res.data.skills.join(", ") : "",
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await API.patch("/auth/update", user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      alert("Error updating profile");
    }
  };

  return (
    <div style={modal.overlay}>
      <div style={modal.box}>
        <button onClick={onClose} style={modal.closeBtn}>✖</button>
        <h2 style={modal.title}>My Profile</h2>

        <div style={modal.form}>
          <label style={modal.label}>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={!editMode}
            style={editMode ? modal.input : modal.readonly}
          />

          <label style={modal.label}>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled
            style={modal.readonly}
          />

          <label style={modal.label}>Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
            disabled={!editMode}
            style={editMode ? modal.input : modal.readonly}
          />

          <label style={modal.label}>Skills</label>
          <input
            type="text"
            name="skills"
            value={user.skills || ""}
            onChange={handleChange}
            disabled={!editMode}
            style={editMode ? modal.input : modal.readonly}
          />
        </div>

        <div style={modal.buttonRow}>
          {!editMode ? (
            <button onClick={() => setEditMode(true)} style={modal.editBtn}>
              Edit
            </button>
          ) : (
            <button onClick={handleUpdate} style={modal.updateBtn}>
              Update
            </button>
          )}
          <button onClick={onClose} style={modal.closeButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const modal = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  box: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    width: "400px",
    position: "relative",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "12px",
    border: "none",
    background: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  title: { textAlign: "center", color: "#6b3fa0", marginBottom: "16px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  label: { fontSize: "14px", fontWeight: "500", color: "#444" },
  input: {
    padding: "8px",
    border: "1px solid #aaa",
    borderRadius: "6px",
    fontSize: "14px",
  },
  readonly: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#f5f5f5",
    fontSize: "14px",
  },
  buttonRow: {
    marginTop: "18px",
    display: "flex",
    justifyContent: "space-between",
  },
  editBtn: {
    background: "#6b3fa0",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  updateBtn: {
    background: "#28a745",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  closeButton: {
    background: "#ccc",
    color: "#333",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
