import React, { useState } from "react";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href =
        res.data.user.role === "admin" ? "/admin" : "/jobs";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h1 style={styles.logo}>Job<span style={{ color: "#fff" }}>Tracker</span></h1>
      </div>

      {/* Login Card */}
      <div style={styles.container}>
        <form onSubmit={handle} style={styles.card}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Login to continue</p>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={styles.footerText}>
            Don’t have an account?{" "}
            <a href="/register" style={styles.link}>
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: 'linear-gradient(135deg, #e8d7ff 0%, #c7b2ff 100%)',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  navbar: {
    width: "100%",
    padding: "15px 0",
    textAlign: "center",
    backgroundColor: "#6b3fa0",
    color: "white",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  logo: {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  card: {
    background: "white",
    padding: "40px 30px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
    transition: "transform 0.3s ease",
    animation: "fadeIn 0.6s ease",
  },
  title: {
    color: "#6b3fa0",
    marginBottom: "8px",
    fontSize: "1.8rem",
  },
  subtitle: {
    color: "#666",
    fontSize: "0.9rem",
    marginBottom: "25px",
  },
  field: {
    textAlign: "left",
    marginBottom: "15px",
  },
  label: {
    color: "#6b3fa0",
    fontWeight: "600",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "90%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "1rem",
    transition: "0.2s",
  },
  button: {
    marginTop: "15px",
    background: "#6b3fa0",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "12px 18px",
    width: "100%",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  footerText: {
    marginTop: "15px",
    fontSize: "0.9rem",
    color: "#666",
  },
  link: {
    color: "#6b3fa0",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

// Simple fade animation (optional CSS)
const fadeAnimation = document.createElement("style");
fadeAnimation.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(fadeAnimation);
