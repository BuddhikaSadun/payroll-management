import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";

import NavBar from "../../NavBar";
import "../../../assets/Staff/Profile/StaffProfile.css";
import { Header } from "antd/es/layout/layout";
import StaffSalary from "../StaffSalary/StaffSalary";
import StaffLeave from "../StaffLeave/StaffLeave";

function StaffProfile() {
  const [staffData, setStaffData] = useState({
    name: "",
    email: "",
    contactNo: "",
    dept: "",
    post: "",
    img: "",
    todayDate: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // assuming key is "user"
    if (user?.email) {
      fetchEmployeeData(user.email);
    }
  }, []);

  const fetchEmployeeData = async (email) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/employee/profile/${email}`
      );
      const employee = res.data.employee;

      setStaffData({
        name: employee.personalDetails?.name,
        email: employee.personalDetails?.email,
        contactNo: employee.personalDetails?.contactNo,
        dept: employee.employmentDetails?.dept,
        post: employee.employmentDetails?.designation,
        status: employee.employmentDetails?.status,
        todayDate: employee.todayDate,
        img: employee.img,
      });
    } catch (error) {
      console.error("Failed to fetch employee data:", error);
    }
  };

  return (
    <div className="staff-profile-container">
      <h1 style={{ textAlign: "center" }}>Employee Profile</h1>
      <div className="staff-card">
        <h2>Employee Details</h2>
        <div className="profile-image-container">
          {staffData.img ? (
            <img src={staffData.img} alt="Employee" className="profile-image" />
          ) : (
            <i className="fas fa-user-circle default-profile-icon"></i>
          )}
        </div>

        <div className="input-container">
          <label className="input-label">Employee Name</label>
          <input
            type="name"
            id="name"
            value={staffData.name || ""}
            placeholder="Employee Name"
            className="input-field"
            disabled
          />
        </div>

        <div className="input-container">
          <label className="input-label">Email</label>
          <input
            type="email"
            id="email"
            value={staffData.email || ""}
            placeholder="Employee Email"
            className="input-field"
            disabled={true}
          />
        </div>

        <div className="input-row">
          <div className="input-container">
            <label className="input-label">Department</label>
            <input
              type="text"
              id="department"
              value={staffData.dept || ""}
              placeholder="Department"
              className="input-field"
              disabled={true}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Post</label>
            <input
              type="text"
              id="post"
              value={staffData.post || ""}
              placeholder="Post"
              className="input-field"
              disabled={true}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-container">
            <label className="input-label">Contact No</label>
            <input
              type="text"
              id="contactNo"
              value={staffData.contactNo || ""}
              placeholder="Contact Number"
              className="input-field"
              disabled={true}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Joined Date</label>
            <input
              type="date"
              id="joinedDate"
              value={staffData.todayDate || "N/A"}
              className="input-field"
              disabled={true}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-container">
            <label className="input-label">Status</label>
            <input
              type="text"
              id="status"
              value={staffData.status || ""}
              placeholder="Status"
              className="input-field"
              disabled={true}
            />
          </div>
        </div>
      </div>

      <div className="salary-leave-wrapper">
        <div className="leaveCard">
          <StaffLeave />
        </div>
        <div className="salaryCard">
          <StaffSalary />
        </div>
      </div>
    </div>
  );
}

export default StaffProfile;
