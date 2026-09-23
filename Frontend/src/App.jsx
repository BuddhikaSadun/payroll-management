import Login from "./components/Login.jsx";

import AddStaffLeave from "./components/Staff/StaffLeave/AddStaffLeave.jsx";
import StaffProfile from "./components/Staff/StaffProfile/StaffProfile.jsx";
import StaffSalary from "./components/Staff/StaffSalary/StaffSalary.jsx";
import StaffLeave from "./components/Staff/StaffLeave/StaffLeave.jsx";
import Intro from "./components/Intro.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/Register.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import AdminProfile from "./components/Admin/Dashboard/Dashboard.jsx";
import EmployeeManagement from "./components/Admin/Employee/EmployeeManagement.jsx";
import SalaryManagement from "./components/Admin/Salary/SalaryManagement.jsx";
import LeaveManagement from "./components/Admin/Leave/LeaveManagement.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Intro />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminProfile />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="salary" element={<SalaryManagement />} />
            <Route path="leave" element={<LeaveManagement />} />
          </Route>

          {/* Staff routes */}
          <Route path="/staff/profile" element={<StaffProfile />} />
          <Route path="/staff/salary" element={<StaffSalary />} />
          <Route path="/staff/leave" element={<StaffLeave />} />
          <Route path="/staff/leave/add" element={<AddStaffLeave />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
