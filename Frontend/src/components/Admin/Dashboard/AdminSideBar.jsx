import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

import {
  DashboardOutlined,
  TeamOutlined,
  DollarOutlined,
  CalendarOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const AdminSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/employees",
      icon: <TeamOutlined />,
      label: "Employees",
    },
    {
      key: "/admin/salary",
      icon: <DollarOutlined />,
      label: "Salary Management",
    },
    {
      key: "/admin/leave",
      icon: <CalendarOutlined />,
      label: "Leave Management",
    },
    {
      key: "/admin/reports",
      icon: <BarChartOutlined />,
      label: "Reports",
    },
    {
      key: "/admin/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  return (
    <Sider width={240} className="admin-sidebar">
      <div className="sidebar-logo">
        <h2>Admin Panel</h2>
      </div>

      <Menu
        mode="inline"
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default AdminSidebar;
