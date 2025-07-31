import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table, Alert, message } from "antd";
import AddLeave from "./AddStaffLeave.jsx";

import "../../../assets/Staff/Leave/StaffLeave.css"; // Your CSS file here

function StaffLeave() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [empId, setEmpId] = useState(null);
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // 👈 Parse JSON
        if (!user?.email) return;

        const email = user.email;

        // 1. Get employee by email
        const empRes = await axios.get(
          `http://localhost:8000/profile/${email}`
        );
        const employee = empRes.data.employee; // adjust if your response shape differs

        if (!employee || !employee._id) {
          console.log("Logged-in email not found in employee records");
          return;
        }

        console.log("Logged-in user matched:", employee);

        setEmpId(employee._id);
        setEmployeeName(employee.personalDetails?.name || "N/A");

        // 2. Get leave records for the matched employee
        const leaveRes = await axios.get(
          `http://localhost:8000/leave/${employee._id}`
        );
        setLeaveData(leaveRes.data.leaves || []);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveDetails();
  }, []);

  const deleteLeaveHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/leave/delete/${id}`);
      alert("Successfully Deleted!");
      leaveRequestHandler(); // Refresh table after delete
    } catch (error) {
      console.error(error.message);
    }
  };
  const LeaveColumns = [
    {
      title: "Employee Name",
      dataIndex: "employeeName", // fix here
      key: "employeeName",
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => status || "Pending",
      width: 200,
    },
  ];

  return (
    <div className="leave-container">
      <h2>Employee Leaves</h2>
      <Table
        dataSource={leaveData.map((leave) => ({
          ...leave,
          key: leave._id, // Assuming each leave has a unique _id from MongoDB
          employeeName: leave.employeeName || "N/A",
        }))}
        columns={LeaveColumns}
      />

      <Button
        type="primary"
        size="large"
        onClick={() => setIsModalVisible(true)}
      >
        Add Leave
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AddLeave
          onSuccess={() => {
            setIsModalVisible(false); // Close modal
            leaveRequestHandler(); // Refresh table
          }}
        />
      </Modal>
    </div>
  );
}

export default StaffLeave;
