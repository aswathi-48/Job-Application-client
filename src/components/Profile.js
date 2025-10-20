// import React, { useEffect, useState } from "react";
// import API from "../api";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [skills, setSkills] = useState("");

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await API.get("/auth/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//       setName(res.data.name);
//       setPhone(res.data.phone || "");
//       setSkills(res.data.skills ? res.data.skills.join(", ") : "");
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const handleEdit = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await API.patch(
//         "/auth/profile",
//         { name, phone, skills },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("successfully edited")
//       setUser(res.data);
//       setEditMode(false);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to update profile");
//     }
//   };

//   if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

//   return (
//     <div
//       style={{
//         maxWidth: "600px",
//         margin: "20px auto",
//         padding: "20px",
//         background: "#fff",
//         borderRadius: "10px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//       }}
//     >
//       <h2 style={{ textAlign: "center", color: "#6b3fa0", marginBottom: "20px" }}>
//         Profile
//       </h2>

//       <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//         <label style={{ fontWeight: "bold" }}>Name:</label>
//         {editMode ? (
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//           />
//         ) : (
//           <p>{user.name}</p>
//         )}

//         <label style={{ fontWeight: "bold" }}>Phone:</label>
//         {editMode ? (
//           <input
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//           />
//         ) : (
//           <p>{user.phone || "-"}</p>
//         )}

//         <label style={{ fontWeight: "bold" }}>Skills:</label>
//         {editMode ? (
//           <input
//             type="text"
//             value={skills}
//             onChange={(e) => setSkills(e.target.value)}
//             placeholder="Comma separated"
//             style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//           />
//         ) : (
//           <p>{user.skills?.join(", ") || "-"}</p>
//         )}

//         <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
//           {editMode ? (
//             <>
//               <button
//                 onClick={() => setEditMode(false)}
//                 style={{
//                   padding: "8px 12px",
//                   borderRadius: "5px",
//                   border: "1px solid #ccc",
//                   background: "#f0f0f0",
//                   cursor: "pointer",
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleEdit}
//                 style={{
//                   padding: "8px 12px",
//                   borderRadius: "5px",
//                   border: "none",
//                   background: "#6b3fa0",
//                   color: "#fff",
//                   cursor: "pointer",
//                 }}
//               >
//                 Save
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => setEditMode(true)}
//               style={{
//                 padding: "8px 12px",
//                 borderRadius: "5px",
//                 border: "none",
//                 background: "#6b3fa0",
//                 color: "#fff",
//                 cursor: "pointer",
//               }}
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import API from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [cvPreview, setCvPreview] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
      setName(res.data.name);
      setPhone(res.data.phone || "");
      setSkills(res.data.skills?.join(", ") || "");
      setImagePreview(res.data.image || "");
      setCvPreview(res.data.cv || "");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("skills", skills);
      if (imageFile) formData.append("image", imageFile);
      if (cvFile) formData.append("cv", cvFile);

      const res = await API.patch("/auth/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  if (!user) return null;

  const isAdmin = user.role === "admin";

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.topBar}>
          <h2 style={styles.heading}>My Profile</h2>
          {!editMode && (
            <button onClick={() => setEditMode(true)} style={styles.editBtn}>
              ✏️ Edit
            </button>
          )}
        </div>

        <div style={styles.profileContainer}>
          <div style={styles.imageSection}>
            <img
              src={imagePreview || "/default-user.png"}
              alt="Profile"
              style={styles.image}
            />
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                }}
                style={styles.fileInput}
              />
            )}
          </div>

          <div style={styles.infoSection}>
            <div style={styles.fieldRow}>
              <label style={styles.label}>Name:</label>
              {editMode ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                />
              ) : (
                <span>{user.name}</span>
              )}
            </div>

            <div style={styles.fieldRow}>
              <label style={styles.label}>Email:</label>
              <span>{user.email}</span>
            </div>

            <div style={styles.fieldRow}>
              <label style={styles.label}>Phone:</label>
              {editMode ? (
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={styles.input}
                />
              ) : (
                <span>{user.phone || "-"}</span>
              )}
            </div>

            <div style={styles.fieldRow}>
              <label style={styles.label}>Role:</label>
              <span
                style={{
                  background: isAdmin ? "#ff9800" : "#4caf50",
                  color: "#fff",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  textTransform: "capitalize",
                }}
              >
                {user.role}
              </span>
            </div>

            {/* Hide skills and CV for admin */}
            {!isAdmin && (
              <>
                <div style={styles.fieldRow}>
                  <label style={styles.label}>Skills:</label>
                  {editMode ? (
                    <input
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="Comma separated"
                      style={styles.input}
                    />
                  ) : (
                    <span>{user.skills?.join(", ") || "-"}</span>
                  )}
                </div>

                <div style={styles.fieldRow}>
                  <label style={styles.label}>CV:</label>
                  {editMode ? (
                    <>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          setCvFile(e.target.files[0]);
                          setCvPreview(e.target.files[0]?.name);
                        }}
                        style={styles.fileInput}
                      />
                      {cvPreview && <span>Selected: {cvPreview}</span>}
                    </>
                  ) : user.cv ? (
                    <a
                      href={user.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.cvLink}
                    >
                      View CV
                    </a>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </>
            )}

            {editMode && (
              <div style={styles.buttonRow}>
                <button
                  onClick={() => setEditMode(false)}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button onClick={handleEdit} style={styles.saveBtn}>
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "30px",
    background: "#f8f5fc",
    minHeight: "80vh",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "750px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  heading: { color: "#6b3fa0", margin: 0, fontSize: "1.6rem" },
  profileContainer: {
    display: "flex",
    gap: "30px",
    alignItems: "flex-start",
  },
  imageSection: {
    flex: "0 0 160px",
    textAlign: "center",
  },
  image: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #6b3fa0",
  },
  fileInput: { marginTop: "10px" },
  infoSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  fieldRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "6px",
  },
  label: { fontWeight: "bold", color: "#555" },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "60%",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  },
  editBtn: {
    background: "#6b3fa0",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },
  saveBtn: {
    background: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },
  cancelBtn: {
    background: "#ccc",
    color: "#333",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cvLink: {
    color: "#6b3fa0",
    textDecoration: "underline",
    fontWeight: "500",
  },
};
