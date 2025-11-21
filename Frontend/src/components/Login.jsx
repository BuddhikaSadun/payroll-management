import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import bg from "../assets/images/bg.png";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  //const [error, setError] = useState("");

  const navigate = useNavigate();
  const loginHandler = async (data) => {
    data.preventDefault();
    try {
      await axios.post("http://localhost:8000/basicUser/loginUser", {
        email: email,
        password: password,
        position: position,
      });

      setEmail("");
      setPassword("");

      // Save user input data to local storage
      localStorage.setItem("user", JSON.stringify({ email, position }));

      Swal.fire({
        title: "Success",
        type: "success",
        text: `Sucessfully logged in as ${position}!`,
      });

      setTimeout(() => {
        if (position == "Admin") navigate("/admin/profile");
        if (position == "Staff") navigate("/staff/profile");
      }, 1000);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        type: "error",
        text: "Error in logging!",
        position: "center",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
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

      // Reset fields and switch to login
      setEmail("");
      setPassword("");
      setPosition("");
      setIsSignUp(false);
    } catch (error) {
      console.error(error.message);

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
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "50px",
          fontWeight: 500,
        }}
      >
        Staff Management System
      </h2>

      <div
        style={{
          backgroundColor: "white",
          margin: "0px 120px",
          border: "4px solid rgb(94, 89, 239)",
          borderRadius: "10px",
          padding: "50px",
        }}
      >
        {isSignUp ? (
          <>
            <h3
              style={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: 600,
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              Sign Up
            </h3>

            <form
              onSubmit={signUpHandler}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Email */}
              <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#4b5563",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    marginTop: "0.5rem",
                    width: "100%",
                    padding: "0.5rem 1.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    color: "#1f2937",
                  }}
                />
              </div>

              {/* Password */}
              <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#4b5563",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    marginTop: "0.5rem",
                    width: "100%",
                    padding: "0.5rem 1.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    color: "#1f2937",
                  }}
                />
              </div>

              {/* Position */}
              <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#4b5563",
                  }}
                >
                  Position
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  style={{
                    marginTop: "0.5rem",
                    width: "100%",
                    padding: "0.5rem 1.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    color: "#1f2937",
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
                  display: "block", // take its own line
                  width: "180px", // fixed width, adjust as needed
                  margin: "40px auto 0 auto", // top margin 40px, centered horizontally
                  backgroundColor: "#4f46e5",
                  color: "white",
                  fontWeight: "bold",
                  padding: "12px 0", // smaller vertical padding
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  border: "none",
                  textAlign: "center",
                  fontSize: "16px", // optional, adjust text size
                }}
              >
                Sign Up
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Already have an account?{" "}
              <span
                style={{
                  cursor: "pointer",
                  fontWeight: "bolder",
                  textDecoration: "underline",
                }}
                onClick={() => setIsSignUp(false)}
              >
                Log in
              </span>
            </p>
          </>
        ) : (
          <>
            <h3
              style={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: 600,
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              Login
            </h3>

            <form
              onSubmit={loginHandler}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Email */}
              <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#4b5563",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    marginTop: "0.5rem",
                    width: "100%",
                    padding: "0.5rem 1.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    color: "#1f2937",
                  }}
                />
              </div>

              {/* Password */}
              <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#4b5563",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    marginTop: "0.5rem",
                    width: "100%",
                    padding: "0.5rem 1.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    color: "#1f2937",
                  }}
                />
              </div>

              {/* Position */}
              <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#4b5563",
                  }}
                >
                  Position
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  style={{
                    marginTop: "0.5rem",
                    width: "100%",
                    padding: "0.5rem 1.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    color: "#1f2937",
                  }}
                >
                  <option value="">Select Position</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  display: "block", // take its own line
                  width: "180px", // fixed width, adjust as needed
                  margin: "40px auto 0 auto", // top margin 40px, centered horizontally
                  backgroundColor: "#4f46e5",
                  color: "white",
                  fontWeight: "bold",
                  padding: "12px 0", // smaller vertical padding
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  border: "none",
                  textAlign: "center",
                  fontSize: "16px", // optional, adjust text size
                }}
              >
                Log In
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Not signed up yet?{" "}
              <span
                style={{
                  cursor: "pointer",
                  fontWeight: "bolder",
                  textDecoration: "underline",
                }}
                onClick={() => setIsSignUp(true)}
              >
                Sign up
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
export default Login;
