import Login from "./components/Login.jsx";
import AdminProfile from "./components/Admin/AdminProfile/AdminProfile.jsx";
import Salary from "./components/Admin/Salary/AdminSalaryAll.jsx";
import Leave from "./components/Admin/Leave/AdminLeave.jsx";

import AddStaffLeave from "./components/Staff/StaffLeave/AddStaffLeave.jsx";
import StaffProfile from "./components/Staff/StaffProfile/StaffProfile.jsx";
import StaffSalary from "./components/Staff/StaffSalary/StaffSalary.jsx";
import StaffLeave from "./components/Staff/StaffLeave/StaffLeave.jsx";
import Intro from "./components/Intro.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Admin routes */}

          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Intro />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/salary/all" element={<Salary />} />
          <Route path="/admin/leave" element={<Leave />} />

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
