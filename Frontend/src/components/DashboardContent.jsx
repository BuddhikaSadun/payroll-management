import React from "react";
import { Layout, Input, Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import "../assets/DashboardContent.css";

const { Header } = Layout;
import "../assets/DashboardContent.css";
export default function DashboardContent() {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return (
    <Header className="app-header">
      {/* Left Side */}
      <h2>Dashboard Header</h2>

      {/* Right Side */}
      <div className="header-content">
        {/* Search */}
        <Input className="header-search" placeholder="Search" />

        {/* Notification icon */}
        <div className="header-icon">
          <FontAwesomeIcon icon={faBell} />
        </div>

        {/* Current Date */}
        <div className="current-date">{currentDate}</div>
      </div>
    </Header>
  );
}
