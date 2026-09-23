import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import croppedLogo from "../assets/images/logo.png";
import "../assets/Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is on the base URL "/"
  const isBaseUrl = location.pathname === "/";

  const handleLogout = () => {
    // Remove logged-in user
    localStorage.removeItem("user");
    localStorage.removeItem("email");

    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="header-content">
        {/* Logo - Left */}
        <img src={croppedLogo} alt="Logo" className="header-logo" />

        {/* Links - Right */}
        <div className="header-links">
          <a href="/" className="header-link">
            Home
          </a>

          {/* Show Login on "/" */}
          {isBaseUrl ? (
            <a href="/login" className="header-link">
              Login
            </a>
          ) : (
            /* Show Logout on other pages */

            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
}
