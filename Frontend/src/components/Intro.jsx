import React from "react";
import { useNavigate } from "react-router-dom";

// Example images for features (replace with your actual images)
import adminLoginImg from "../assets/images/admin-login.png";
import leaveImg from "../assets/images/leave.png";
import salaryImg from "../assets/images/salary.png";
import staffMgmtImg from "../assets/images/staff.png";
import { motion } from "framer-motion";
function Intro() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Admin & Staff Login",
      description: "Separate authentication for Admin and Staff users.",
      img: adminLoginImg,
    },
    {
      title: "Handle Leave Requests",
      description: "Approve or reject leave requests efficiently.",
      img: leaveImg,
    },
    {
      title: "Calculate Salary",
      description: "Automatic salary calculation and record keeping.",
      img: salaryImg,
    },
    {
      title: "Manage Staff Details",
      description: "Add, update, or remove staff members easily.",
      img: staffMgmtImg,
    },
  ];
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "#f5f7fa",
        background: "linear-gradient(105deg, #4f46e5, #0000, #60a5fa)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "48px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Welcome to Staff Management System
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
          marginBottom: "40px",
          color: "#555",
        }}
      >
        Manage your company staff operations efficiently with our system.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              padding: "20px",
              textAlign: "center",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={feature.img}
              alt={feature.title}
              style={{
                width: feature.title === "Calculate Salary" ? "220px" : "180px", // larger size for salary
                height:
                  feature.title === "Calculate Salary" ? "180px" : "180px",
                objectFit: "contain",
                marginBottom: "15px",
              }}
            />
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
              {feature.title}
            </h3>
            <p style={{ fontSize: "14px", color: "#555" }}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            padding: "15px 40px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#4338ca")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4f46e5")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default Intro;
