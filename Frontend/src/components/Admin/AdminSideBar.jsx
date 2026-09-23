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
import logo from "../../assets/images/logo.png";
import "../../assets/MenuItems.css";
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
      key: "/",
      icon: <LogoutOutlined />,
      label: "Log Out",
      style: { marginTop: "340px" },
    },
  ];

  return (
    <Sider
      width={220}
      style={{ minHeight: "100vh", backgroundColor: "#001529" }}
    >
      <div style={{ backgroundColor: "white" }}>
        <img src={logo} alt="StaffSync Logo" width="75%" height="auto" />
      </div>

      <Menu
        mode="inline"
        items={menuItems}
        className="admin-menu"
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default AdminSidebar;
