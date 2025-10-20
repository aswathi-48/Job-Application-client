// import React from "react";

// export default function Sidebar({ activeTab, setActiveTab, logout }) {
//   const items = [
//     { id: "users", label: "Users" },
//     { id: "companies", label: "Companies" },
//     { id: "jobs", label: "Jobs" },
//   ];

//   return (
//     <div
//       style={{
//         width: "230px",
//         background: "#6b3fa0",
//         color: "white",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         padding: "20px 0",
//       }}
//     >
//       <div>
//         <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Admin</h2>
//         {items.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => setActiveTab(item.id)}
//             style={{
//               padding: "12px 20px",
//               cursor: "pointer",
//               background: activeTab === item.id ? "#a56efc" : "transparent",
//               transition: "0.3s",
//             }}
//           >
//             {item.label}
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={logout}
//         style={{
//           margin: "20px",
//           background: "white",
//           color: "#6b3fa0",
//           padding: "10px",
//           border: "none",
//           borderRadius: "8px",
//           fontWeight: "bold",
//           cursor: "pointer",
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

import React from "react";

export default function Sidebar({ activeTab, setActiveTab, logout }) {
  const items = [
    { id: "profile", label: "Profile" },
    { id: "users", label: "Users" },
    { id: "companies", label: "Companies" },
    { id: "jobs", label: "Jobs" },
    { id: "skills", label: "Skill" },

  ];

  return (
    <div
      style={{
        width: "230px",
        background: "#6b3fa0",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px 0",
        minHeight: "100vh",
      }}
    >
      <div>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Admin</h2>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              padding: "12px 20px",
              cursor: "pointer",
              background: activeTab === item.id ? "#a56efc" : "transparent",
              transition: "0.3s",
              borderRadius: "8px",
              margin: "4px 10px",
            }}
          >
            {item.label}
          </div>
        ))}
      </div>

      <button
        onClick={logout}
        style={{
          margin: "20px",
          background: "white",
          color: "#6b3fa0",
          padding: "10px",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
