// import React, { useEffect, useState } from "react";
// import API from "../api";

// export default function SkillManager() {
//   const [skills, setSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [userRole, setUserRole] = useState("");

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     setUserRole(user?.role);
//     fetchSkills();
//   }, []);

//   const fetchSkills = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await API.get("/skills/list", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSkills(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };

//   const handleAddSkill = async () => {
//     if (!newSkill.trim()) return alert("Enter a skill name!");
//     try {
//       const token = localStorage.getItem("token");
//       await API.post(
//         "/skills/add",
//         { name: newSkill },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Skill added successfully!");
//       setNewSkill("");
//       fetchSkills();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to add skill");
//     }
//   };

//   if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Skill Management</h2>

//       {userRole === "admin" && (
//         <div style={styles.addContainer}>
//           <input
//             type="text"
//             value={newSkill}
//             onChange={(e) => setNewSkill(e.target.value)}
//             placeholder="Enter new skill"
//             style={styles.input}
//           />
//           <button onClick={handleAddSkill} style={styles.addBtn}>
//             Add Skill
//           </button>
//         </div>
//       )}

//       <div style={styles.listContainer}>
//         <h3 style={{ marginBottom: "10px" }}>Skill List</h3>
//         {skills.length === 0 ? (
//           <p>No skills added yet.</p>
//         ) : (
//           <ul style={styles.list}>
//             {skills.map((s) => (
//               <li key={s._id} style={styles.listItem}>
//                 {s.name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: "600px",
//     margin: "30px auto",
//     padding: "20px",
//     background: "#fff",
//     borderRadius: "10px",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//   },
//   heading: {
//     textAlign: "center",
//     color: "#6b3fa0",
//     marginBottom: "20px",
//   },
//   addContainer: {
//     display: "flex",
//     gap: "10px",
//     marginBottom: "20px",
//   },
//   input: {
//     flex: 1,
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//   },
//   addBtn: {
//     background: "#6b3fa0",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     padding: "10px 15px",
//     cursor: "pointer",
//   },
//   listContainer: { marginTop: "20px" },
//   list: {
//     listStyle: "none",
//     padding: 0,
//     display: "grid",
//     gap: "10px",
//   },
//   listItem: {
//     background: "#f9f7fc",
//     borderRadius: "8px",
//     padding: "10px",
//     border: "1px solid #e3d7f3",
//     color: "#333",
//     fontWeight: "500",
//   },
// };


import React, { useEffect, useState } from "react";
import API from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SkillManager() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user?.role);
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/skills/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleAddOrEditSkill = async () => {
    if (!newSkill.trim()) return alert("Enter a skill name!");
    const token = localStorage.getItem("token");

    try {
      if (editId) {
        await API.patch(
          `/skills/edit/${editId}`,
          { name: newSkill },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Company updated successfully!");
      } else {
        await API.post(
          "/skills/add",
          { name: newSkill },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Company updated successfully!");
      }

      setNewSkill("");
      setEditId(null);
      fetchSkills();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed"); 
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    const token = localStorage.getItem("token");
    try {
      await API.delete(`/skills/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Company deleted successfully!");
      fetchSkills();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleEditClick = (skill) => {
    setNewSkill(skill.name);
    setEditId(skill._id);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Skill Management</h2>

      {userRole === "admin" && (
        <div style={styles.addContainer}>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter skill name"
            style={styles.input}
          />
          <button onClick={handleAddOrEditSkill} style={styles.addBtn}>
            {editId ? "Update Skill" : "Add Skill"}
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setNewSkill("");
              }}
              style={styles.cancelBtn}
            >
              Cancel
            </button>
          )}
        </div>
      )}

      <div style={styles.listContainer}>
        <h3 style={{ marginBottom: "10px" }}>Skill List</h3>
        {skills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          <ul style={styles.list}>
            {skills.map((s) => (
              <li key={s._id} style={styles.listItem}>
                <span>{s.name}</span>
                {userRole === "admin" && (
                  <div style={styles.actions}>
                    <button
                      onClick={() => handleEditClick(s)}
                      style={styles.editBtn}
                    >
                     ✏️Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "650px",
    margin: "30px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#6b3fa0",
    marginBottom: "20px",
  },
  addContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  addBtn: {
    background: "#6b3fa0",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 15px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#ccc",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    padding: "10px 15px",
    cursor: "pointer",
  },
  listContainer: { marginTop: "20px" },
  list: {
    listStyle: "none",
    padding: 0,
    display: "grid",
    gap: "10px",
  },
  listItem: {
    background: "#f9f7fc",
    borderRadius: "8px",
    padding: "10px",
    border: "1px solid #e3d7f3",
    color: "#333",
    fontWeight: "500",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: { display: "flex", gap: "8px" },
  editBtn: {
    background: "#6b3fa0",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
