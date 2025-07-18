import Login from "./components/Login.jsx";
import AdminProfile from "./components/AdminProfile.jsx";
import Salary from "./components/Salary/Salary.jsx";
import Leave from "./components/Attendance/Leave.jsx";
import StaffProfile from "./components/StaffProfile/StaffProfile.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/employee" element={<AdminProfile />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/staff/profile" element={<StaffProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
