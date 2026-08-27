import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "./Header";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");

  const navigate = useNavigate();

  const signUpHandler = async (data) => {
    data.preventDefault();

    try {
      await axios.post("http://localhost:8000/basicUser/createUser", {
        email,
        password,
        position,
      });

      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Successfully signed up! Please log in.",
      });

      setEmail("");
      setPassword("");
      setPosition("");

      navigate("/login");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error in signing up!",
        position: "center",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(105deg, #4f46e5, #0000, #60a5fa)",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
        <Header/>
      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          backgroundColor: "#ffffff",
          marginTop: "50px",
          alignSelf: "center",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
        }}
      >
        {/* Title */}
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#1f2937",
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          Sign Up
        </h2>

        <form onSubmit={signUpHandler}>
          {/* Email */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                border: "1px solid #d1d5db",
                borderRadius: "7px",
                fontSize: "15px",
                outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                border: "1px solid #d1d5db",
                borderRadius: "7px",
                fontSize: "15px",
                outline: "none",
              }}
            />
          </div>

          {/* Position */}
          <div style={{ marginBottom: "25px" }}>
            <label
              htmlFor="position"
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Position
            </label>

            <select
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                border: "1px solid #d1d5db",
                borderRadius: "7px",
                fontSize: "15px",
                backgroundColor: "#ffffff",
                color: "#374151",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="">Select Position</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#4f46e5",
              color: "#ffffff",
              fontWeight: "600",
              fontSize: "16px",
              border: "none",
              borderRadius: "7px",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            marginBottom: "0",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#4f46e5",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}