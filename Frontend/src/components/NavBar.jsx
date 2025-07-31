import React, { useState } from "react";

import "../assets/NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  const LogOutHandler = () => {
    localStorage.removeItem("user");
  };
  return (
    <div className="navbar-container">
      <ul className="navbar-ul">
        <li>
          <Link to="/admin/profile">Profile</Link>
        </li>
        <li>
          <Link to="/admin/leave">Leave</Link>
        </li>
        <li>
          <Link to="/admin/salary/all">Salary</Link>
        </li>
        <li className="logout-btn" onClick={LogOutHandler}>
          <Link to="/">Log out</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
