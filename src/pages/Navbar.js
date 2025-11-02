// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav style={styles.navbar}>
//       <div style={styles.container}>
//         {/* Logo Section */}
//         <Link to="/" style={styles.logo}>
//           <img src="/logo.png" alt="Logo" style={styles.logoImg} />
//           <span style={styles.logoText}>JobFinder</span>
//         </Link>

//         {/* Mobile Menu Toggle */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           style={{
//             ...styles.menuButton,
//             display: window.innerWidth < 768 ? "block" : "none",
//           }}
//         >
//           {menuOpen ? "✖" : "☰"}
//         </button>

//         {/* Links */}
//         <div
//           style={{
//             ...styles.linkContainer,
//             display: menuOpen || window.innerWidth >= 768 ? "flex" : "none",
//           }}
//         >
//           <ul style={styles.ul}>
//             <li>
//               <Link to="/jobs" style={styles.link}>
//                 Jobs
//               </Link>
//             </li>

//             {token ? (
//               <>
//                 <li>
//                   <Link to="/admin" style={styles.link}>
//                     Dashboard
//                   </Link>
//                 </li>

//                 <li
//                   style={styles.profileWrapper}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.querySelector("div").style.display = "block";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.querySelector("div").style.display = "none";
//                   }}
//                 >
//                   <button style={styles.profileButton}>
//                     {user?.name || "Profile"}
//                   </button>
//                   <div style={styles.dropdown}>
//                     <Link to="/profile" style={styles.dropdownItem}>
//                       My Profile
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       style={{ ...styles.dropdownItem, borderTop: "1px solid #ccc" }}
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link to="/login" style={styles.link}>
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/register" style={styles.registerBtn}>
//                     Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// /* 🎨 Inline Styles */
// const styles = {
//   navbar: {
//     width: "100%",
//     background: "linear-gradient(135deg, #d7b6f6ff 0%, #cbb2d5ff 100%)",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     position: "sticky",
//     top: 0,
//     zIndex: 1000,
//   },
//   container: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "14px 24px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//   },
//   logo: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     textDecoration: "none",
//   },
//   logoImg: {
//     width: "40px",
//     height: "40px",
//     borderRadius: "8px",
//   },
//   logoText: {
//     fontSize: "22px",
//     fontWeight: "700",
//     color: "#333",
//     letterSpacing: "0.5px",
//   },
//   menuButton: {
//     background: "none",
//     border: "none",
//     color: "#333",
//     fontSize: "24px",
//     cursor: "pointer",
//   },
//   linkContainer: {
//     display: "flex",
//     alignItems: "center",
//   },
//   ul: {
//     listStyle: "none",
//     display: "flex",
//     alignItems: "center",
//     gap: "20px",
//     margin: 0,
//     padding: 0,
//   },
//   link: {
//     color: "#333",
//     textDecoration: "none",
//     fontWeight: "500",
//     fontSize: "16px",
//     transition: "all 0.2s ease",
//     padding: "6px 10px",
//     borderRadius: "6px",
//   },
//   registerBtn: {
//     background: "#6b3fa0",
//     color: "#fff",
//     textDecoration: "none",
//     padding: "8px 16px",
//     borderRadius: "8px",
//     fontWeight: "bold",
//     fontSize: "15px",
//     boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
//     transition: "0.3s",
//   },
//   profileWrapper: {
//     position: "relative",
//   },
//   profileButton: {
//     background: "none",
//     border: "none",
//     color: "#333",
//     fontWeight: "500",
//     cursor: "pointer",
//     fontSize: "16px",
//   },
//   dropdown: {
//     display: "none",
//     position: "absolute",
//     right: 0,
//     top: "40px",
//     background: "#fff",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
//     overflow: "hidden",
//     minWidth: "150px",
//   },
//   dropdownItem: {
//     display: "block",
//     width: "100%",
//     textAlign: "left",
//     background: "none",
//     border: "none",
//     color: "#333",
//     textDecoration: "none",
//     padding: "10px 14px",
//     cursor: "pointer",
//     fontSize: "15px",
//     transition: "0.2s",
//   },
// };

// /* Hover effects via JS not CSS (for inline styles) */
// Object.assign(styles.link, {
//   onMouseEnter: (e) => (e.target.style.color = "#6b3fa0"),
//   onMouseLeave: (e) => (e.target.style.color = "#333"),
// });
// Object.assign(styles.registerBtn, {
//   onMouseEnter: (e) => (e.target.style.background = "#583187"),
//   onMouseLeave: (e) => (e.target.style.background = "#6b3fa0"),
// });
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileDialog from "./ProfileDialog";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.container}>
          {/* Logo Section */}
          <Link to="/" style={styles.logo}>
            <img src="../../public/image/joblogo.png" alt="Logo" style={styles.logoImg} />
            {/* <span style={styles.logoText}>JobFinder</span> */}
          </Link>

          {/* Navigation Links */}
          <ul style={styles.ul}>
            <li>
              <Link to="/jobs" style={styles.link}>
                Jobs
              </Link>
            </li>

            {token ? (
              <>
                <li>
                  <Link to="/admin" style={styles.link}>
                    Dashboard
                  </Link>
                </li>

                {/* Profile Dropdown */}
                <li
                  style={styles.dropdownWrapper}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <button style={styles.profileBtn}>
                    {user?.name || "Profile"} ⮟
                  </button>

                  {showDropdown && (
                    <div style={styles.dropdown}>
                      <button
                        style={styles.dropdownItem}
                        onClick={() => setShowProfile(true)}
                      >
                        My Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        style={{
                          ...styles.dropdownItem,
                          borderTop: "1px solid #ddd",
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" style={styles.link}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" style={styles.registerBtn}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Profile Dialog */}
      {showProfile && <ProfileDialog onClose={() => setShowProfile(false)} />}
    </>
  );
}

// Inline styles
const styles = {
  navbar: {
    width: "100%",
    background: "linear-gradient(135deg, #e0c3fc 0%, #f0b4f1ff 100%)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    fontSize: "20px",
  },
  logoImg: { width: "40px", height: "40px", borderRadius: "8px" },
  logoText: { marginLeft: "10px" },
  ul: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
    alignItems: "center",
  },
  link: {
    color: "#333",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px",
  },
  registerBtn: {
    background: "#6b3fa0",
    color: "#fff",
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    fontWeight: "bold",
  },
  dropdownWrapper: {
    position: "relative",
  },
  profileBtn: {
    background: "none",
    border: "none",
    color: "#333",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "16px",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "20px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    minWidth: "140px",
    overflow: "hidden",
    zIndex: 100,
  },
  dropdownItem: {
    display: "block",
    padding: "10px 14px",
    width: "100%",
    textAlign: "left",
    border: "none",
    background: "none",
    cursor: "pointer",
    color: "#333",
    fontSize: "15px",
  },
};
