import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSideBar.jsx";
import DashboardContent from "../DashboardContent.jsx";

const { Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#001529" }}>
      {/* Vertical Sidebar */}
      <AdminSidebar />

      <Layout>
        {/* Top Header */}
        <DashboardContent />

        {/* Current Page */}
        <Content className="dashboard-container">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
