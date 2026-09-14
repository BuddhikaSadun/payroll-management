import Login from "./components/Login.jsx";
import AdminProfile from "./components/Admin/Dashboard/AdminProfile.jsx";

import AddStaffLeave from "./components/Staff/StaffLeave/AddStaffLeave.jsx";
import StaffProfile from "./components/Staff/StaffProfile/StaffProfile.jsx";
import StaffSalary from "./components/Staff/StaffSalary/StaffSalary.jsx";
import StaffLeave from "./components/Staff/StaffLeave/StaffLeave.jsx";
import Intro from "./components/Intro.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/Register.jsx";
import EmployeeManagement from "./components/Admin/Dashboard/Employee/";
import SalaryManagement from "./components/Admin/Dashboard/Salary/SalaryManagement.jsx";
import LeaveManagement from "./components/Admin/Dashboard/Leave/LeaveManagement.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Admin routes */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Intro />} />
          <Route path="/admin/dashboard" element={<AdminProfile />} />

          <Route path="/admin/employees" element={<EmployeeManagement />} />

          <Route path="/admin/salary" element={<SalaryManagement />} />

          <Route path="/admin/leave" element={<LeaveManagement />} />

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
