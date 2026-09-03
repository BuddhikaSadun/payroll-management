import React from "react";
import { Layout, Input, Avatar, Badge } from "antd";

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
      <div className="header-logo">Admin Dashboard</div>

      {/* Right Side */}
      <div className="header-content">
        {/* Current Date */}
        <div className="current-date">{currentDate}</div>

        {/* Search */}
        <Input className="header-search" placeholder="Search" />

        {/* Language */}
        <div className="header-icon">
          <span>EN</span>
        </div>

        {/* Notification */}

        {/* Admin */}
        <div className="admin-profile">
          <span>Admin</span>
        </div>
      </div>
    </Header>
  );
}
