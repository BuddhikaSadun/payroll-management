import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../assets/Login.css";

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
    <div className="background-container">
      <h2 className="title">Staff Management System</h2>
      <div className="wrapper">
        {isSignUp ? (
          <>
            {/* Sign Up Interface */}
            <h3 className="subTitle">Sign Up</h3>
            <form onSubmit={signUpHandler} className="form-container">
              <div className="input-container">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input-field"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input-field"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="input-container">
                <label htmlFor="position" className="input-label">
                  Position
                </label>
                <select
                  id="position"
                  name="position"
                  className="input-field"
                  value={position}
                  onChange={(event) => setPosition(event.target.value)}
                >
                  <option value="">Select Position</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <button type="submit" className="submit-button">
                Sign Up
              </button>
            </form>
            <p>
              Already have an account?{" "}
              <span className="toggle-link" onClick={() => setIsSignUp(false)}>
                Log in
              </span>
            </p>
          </>
        ) : (
          <>
            {/* Login Interface */}
            <h3 className="subTitle">Login</h3>
            <form onSubmit={loginHandler} className="form-container">
              <div className="input-container">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input-field"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input-field"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="input-container">
                <label htmlFor="position" className="input-label">
                  Position
                </label>
                <select
                  id="position"
                  name="position"
                  className="input-field"
                  value={position}
                  onChange={(event) => setPosition(event.target.value)}
                >
                  <option value="">Select Position</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <button type="submit" className="submit-button">
                Log In
              </button>
            </form>
            <br></br>
            <p className="paragraph">
              Not signed up yet?{" "}
              <span className="toggle-link" onClick={() => setIsSignUp(true)}>
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
