
import React, { useEffect, useState } from "react";
import API from "../api";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:7000";

  const loggedUser = JSON.parse(localStorage.getItem("user")); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#6b3fa0", textAlign: "center", marginBottom: "20px" }}>
        User List
      </h2>

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
            <th style={{ padding: "12px", textAlign: "center" }}>Image</th>
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>Phone</th>
            <th style={{ padding: "12px" }}>Role</th>
            <th style={{ padding: "12px", textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr
                key={u._id}
                style={{
                  borderBottom: "1px solid #ddd",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              >
                {/* Image */}
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <img
                    src={
                      u.image
                        ? `${API_URL}${u.image}`
                        : `${API_URL}/uploads/default.png`
                    }
                    alt={u.name}
                    width={80}
                    height={80}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                </td>

                {/* Name */}
                <td style={{ padding: "10px", fontWeight: "500" }}>{u.name}</td>

                {/* Email */}
                <td style={{ padding: "10px" }}>{u.email}</td>

                {/* Phone */}
                <td style={{ padding: "10px" }}>{u.phone}</td>

                {/* Role */}
                <td style={{ padding: "10px", textTransform: "capitalize" }}>
                  {u.role}
                </td>

                {/* Actions */}
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {loggedUser.id === u._id && (
                    <button
                      onClick={() => window.location.href = `/profile/edit/${u._id}`}
                      style={{
                        marginRight: "5px",
                        padding: "6px 12px",
                        backgroundColor: "#6b3fa0",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  )}
                  {loggedUser.role === "admin" && (
                    <button
                      onClick={() => handleDelete(u._id)}
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
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "20px", textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
