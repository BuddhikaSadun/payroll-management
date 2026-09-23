import React from "react";
import { Layout, Input } from "antd";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import "../assets/DashboardContent.css";

const { Header } = Layout;

export default function DashboardContent() {
  const location = useLocation();

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const pageTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/employees": "Employee Management",
    "/admin/salary": "Salary Management",
    "/admin/leave": "Leave Management",
    "/admin/reports": "Reports",
  };

  const currentPage = pageTitles[location.pathname] || "Admin Dashboard";

  return (
    <Header className="app-header">
      <h2>{currentPage}</h2>

      <div className="header-content">
        <Input className="header-search" placeholder="Search" />

        <div className="header-icon">
          <FontAwesomeIcon icon={faBell} />
        </div>

        <div className="current-date">{currentDate}</div>
      </div>
    </Header>
  );
}
