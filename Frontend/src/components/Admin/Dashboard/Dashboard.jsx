import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../../assets/Dashboard.css";
import DashboardContent from "../../DashboardContent.jsx";
import AdminSidebar from "../AdminSideBar.jsx";

import { Layout } from "antd";
const { Content } = Layout;
const AdminDashboard = () => {
  const [profileList, setProfileList] = useState([]);
  const [salaryList, setSalaryList] = useState([]);
  const [leaveList, setLeaveList] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProfiles();
    fetchSalaries();
    fetchLeaves();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/employee/get");

      console.log("Profiles fetched:", response.data.profiles);
      setProfileList(response.data.profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const fetchSalaries = async () => {
    try {
      const response = await axios.get("http://localhost:8000/salary/get");

      setSalaryList(response.data.salaries);
    } catch (error) {
      console.error("Error fetching salaries:", error);
    }
  };

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:8000/leave/get");

      setLeaveList(response.data.leaves);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const totalPayroll = salaryList.reduce(
    (total, salary) => total + Number(salary.amount || 0),
    0,
  );

  const pendingLeaves = leaveList.filter(
    (leave) => leave.status === "Pending",
  ).length;

  const acceptedLeaves = leaveList.filter(
    (leave) => leave.status === "Accepted",
  ).length;

  const deleteHandler = async (id) => {
    console.log("Delete handler called with ID:", id);

    try {
      await axios.delete(`http://localhost:8000/employee/delete/${id}`);
      alert("Successfully deleted!");
      localStorage.removeItem("email");
      localStorage.removeItem("position");
      localStorage.removeItem("user");
      fetchProfiles(); // Refresh the profile list after deletion
    } catch (error) {
      console.error(
        "Error deleting profile:",
        error.response?.data || error.message,
      );
      alert("Failed to delete profile. Please try again.");
    }
  };

  const updateHandler = async (updatedProfile) => {
    try {
      await axios.put(
        `http://localhost:8000/employee/update/${updatedProfile._id}`,
        updatedProfile,
      );
      alert("Profile updated successfully!");
      fetchProfiles();
      setIsModalVisible(false);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message,
      );
      alert("Failed to update profile. Please try again.");
    }
  };

  // Filtering based on search query
  const filteredProfileList =
    Array.isArray(profileList) && profileList.length > 0
      ? profileList.filter((profile) =>
          profile.personalDetails?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
        )
      : [];

  const dataSource = filteredProfileList.map((profile) => ({
    _id: profile._id,
    name: profile.personalDetails?.name,
    dept: profile.employmentDetails?.dept,
    contactNo: profile.personalDetails?.contactNo,
    email: profile.personalDetails?.email,
    status: profile.employmentDetails?.status,
  }));

  return (
    <div>
      <div className="card-wrapper">
        <div className="card">
          <h3>Total Payroll</h3>
          <p>Rs. {totalPayroll.toLocaleString()}</p>
        </div>

        <div className="card">
          <h3>Total Employees</h3>
          <p>{profileList.length}</p>
        </div>

        <div className="card">
          <h3>Pending Leave Requests</h3>
          <p>{pendingLeaves}</p>
        </div>

        <div className="card">
          <h3>Accepted Leave Requests</h3>
          <p>{acceptedLeaves}</p>
        </div>
      </div>

      <div className="overview-wrapper">
        <div className="emp-overview">
          <h3>Employee Management Overview</h3>
        </div>

        <div className="leave-overview">
          <h3>Leave Overview</h3>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
