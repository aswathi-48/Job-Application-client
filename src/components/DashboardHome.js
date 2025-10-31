
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import API from "../api";

export default function DashboardHome() {
  const [stats, setStats] = useState({ users: 0, jobs: 0, companies: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [usersRes, jobsRes, companiesRes] = await Promise.all([
        API.get("/auth/users", config),
        API.get("/jobs", config),
        API.get("/companies", config),
      ]);

      const users = Array.isArray(usersRes.data)
        ? usersRes.data.length
        : usersRes.data.count || 0;
      const jobs = Array.isArray(jobsRes.data)
        ? jobsRes.data.length
        : jobsRes.data.count || 0;
      const companies = Array.isArray(companiesRes.data)
        ? companiesRes.data.length
        : companiesRes.data.count || 0;

      setStats({ users, jobs, companies });
      setChartData([
        { name: "Users", value: users },
        { name: "Jobs", value: jobs },
        { name: "Companies", value: companies },
      ]);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          color: "#6b3fa0",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        Loading Dashboard...
      </div>
    );

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8f5ff",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h2
        style={{
          color: "#5b2ca0",
          marginBottom: "30px",
          fontWeight: "700",
          fontSize: "26px",
        }}
      >
        Dashboard Overview
      </h2>

      {/* Metric Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        <Card
          title="Total Users"
          value={stats.users}
          icon="👤"
          color="#7a4de8"
          bg="#ede4ff"
        />
        <Card
          title="Total Jobs"
          value={stats.jobs}
          icon="💼"
          color="#7746d1"
          bg="#e9e0ff"
        />
        <Card
          title="Total Companies"
          value={stats.companies}
          icon="🏢"
          color="#6f3fc1"
          bg="#ece2ff"
        />
      </div>

      {/* ====== MAIN CONTENT SECTION ====== */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          // flexWrap: "wrap",
        }}
      >
        {/* Chart Section (Left Side) */}
        <div
          style={{
            flex: "1 1 50%",
            background: "#fff",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(107, 63, 160, 0.1)",
            minWidth: "300px",
            height: "380px",
          }}
        >
          <h3
            style={{
              color: "#6b3fa0",
              marginBottom: "15px",
              fontWeight: "600",
            }}
          >
            Graphical Representation
          </h3>

          <ResponsiveContainer width="88%" height="80%">
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a076f9" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#d8c6ff" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0d6f5" />
              <XAxis dataKey="name" stroke="#6b3fa0" />
              <YAxis allowDecimals={false} stroke="#6b3fa0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
              <Bar dataKey="value" fill="url(#colorPurple)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      {/* Extra Section (Right Side) */}
<div
  style={{
    flex: "1 1 45%",
    background: "#fff",
    padding: "0",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(107, 63, 160, 0.1)",
    minWidth: "280px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "430px",
  }}
>
  {/* Header */}
  <div
    style={{
      background:
        "linear-gradient(135deg, #7a4de8 0%, #a276ff 50%, #d1baff 100%)",
      color: "#fff",
      padding: "18px 25px",
      fontWeight: "700",
      fontSize: "18px",
      letterSpacing: "0.5px",
    }}
  >
    📊 Summary / Activity
  </div>

  {/* Content */}
  <div
    style={{
      flex: 1,
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      background: "#faf7ff",
    }}
  >
    <div
      style={{
        background: "#f1e8ff",
        borderRadius: "12px",
        padding: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p style={{ margin: 0, color: "#6b3fa0", fontWeight: "600" }}>
          Monthly New Users
        </p>
        <h3 style={{ margin: "5px 0 0", color: "#4b2b8a" }}>{stats.users}</h3>
      </div>
      <span style={{ fontSize: "28px" }}>👤</span>
    </div>

    <div
      style={{
        background: "#ebe3ff",
        borderRadius: "12px",
        padding: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p style={{ margin: 0, color: "#6b3fa0", fontWeight: "600" }}>
          Jobs Posted This Month
        </p>
        <h3 style={{ margin: "5px 0 0", color: "#4b2b8a" }}>{stats.jobs}</h3>
      </div>
      <span style={{ fontSize: "28px" }}>💼</span>
    </div>

    <div
      style={{
        background: "#e7dcff",
        borderRadius: "12px",
        padding: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p style={{ margin: 0, color: "#6b3fa0", fontWeight: "600" }}>
          Active Companies
        </p>
        <h3 style={{ margin: "5px 0 0", color: "#4b2b8a" }}>
          {stats.companies}
        </h3>
      </div>
      <span style={{ fontSize: "28px" }}>🏢</span>
    </div>

    <div
      style={{
        background: "#e8d9ff",
        borderRadius: "12px",
        padding: "15px",
      }}
    >
      <p style={{ margin: 0, color: "#6b3fa0", fontWeight: "600" }}>
        Engagement Rate
      </p>
      <div
        style={{
          height: "10px",
          background: "#d3b6ff",
          borderRadius: "10px",
          marginTop: "8px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${((stats.jobs / (stats.users || 1)) * 100).toFixed(1)}%`,
            height: "100%",
            background: "linear-gradient(90deg, #7a4de8, #c4a0ff)",
            borderRadius: "10px",
            transition: "width 0.6s ease",
          }}
        ></div>
      </div>
      <p
        style={{
          marginTop: "6px",
          fontWeight: "bold",
          color: "#4b2b8a",
          textAlign: "right",
        }}
      >
        {((stats.jobs / (stats.users || 1)) * 100).toFixed(1)}%
      </p>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

/* Reusable Card Component */
const Card = ({ title, value, icon, color, bg }) => (
  <div
    style={{
      flex: "1",
      background: "#fff",
      borderRadius: "16px",
      padding: "25px",
      minWidth: "230px",
      boxShadow: "0 4px 14px rgba(107, 63, 160, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: `2px solid ${bg}`,
    }}
  >
    <div>
      <h3 style={{ color: "#6b3fa0", fontWeight: "600", marginBottom: "6px" }}>
        {title}
      </h3>
      <p
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: color,
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
    <div
      style={{
        background: bg,
        color: color,
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px",
        boxShadow: "0 2px 6px rgba(107,63,160,0.1)",
      }}
    >
      {icon}
    </div>
  </div>
);
