import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Modal, Button, Table, Alert, message } from "antd";
import AddLeave from "./AddStaffLeave.jsx";
import "../../../assets/Staff/Leave/Leave.css";
const API_URL = import.meta.env.VITE_API_URL;

function StaffLeave() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empId, setEmpId] = useState(null);
  const [employeeName, setEmployeeName] = useState("");

  const fetchLeaveData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/leave`);
      console.log("All leave data:", response.data);
      setLeaveData(response.data.leaves || []);
    } catch (error) {
      console.error("Error fetching leave data:", error);
      message.error(
        error.response?.data?.message || "Failed to load leave data",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // 👈 Parse JSON
        if (!user?.email) return;

        const email = user.email;

        // 1. Get employee by email
        const empRes = await axios.get(
          `${API_URL}/employee/profile/${encodeURIComponent(email)}`,
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
        const leaveRes = await axios.get(`${API_URL}/leave/${employee._id}`);
        setLeaveData(leaveRes.data.leaves || []);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveDetails();
    fetchLeaveData();
  }, [fetchLeaveData]);

  const deleteLeaveHandler = async (id) => {
    try {
      await axios.delete(`${API_URL}/leave/delete/${id}`);
      alert("Successfully Deleted!");
      fetchLeaveData(); // Refresh table after delete
    } catch (error) {
      console.error(error.message);
    }
  };
  const LeaveColumns = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      render: (text) => <span style={{ fontSize: "16px" }}>{text}</span>,
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      render: (text) => <span style={{ fontSize: "16px" }}>{text}</span>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => (
        <span style={{ fontSize: "16px" }}>
          {" "}
          {date ? new Date(date).toLocaleDateString() : "N/A"}{" "}
        </span>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => (
        <span style={{ fontSize: "16px" }}>
          {date ? new Date(date).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ fontSize: "16px" }}>{status || "Pending"}</span>
      ),
      width: 200,
    },
  ];

  return (
    <div className="staff-section">
      <div className="staff-section-header">
        <h2 className="staff-section-title">Employee Leaves</h2>
        <Button
          type="primary"
          size="middle"
          onClick={() => setIsModalVisible(true)}
        >
          Add Leave
        </Button>
      </div>
      <Table
        className="staff-table"
        loading={loading}
        dataSource={leaveData.map((leave) => ({
          ...leave,
          key: leave._id,
          employeeName: leave.employeeName || "N/A",
        }))}
        columns={LeaveColumns}
        pagination={{ pageSize: 10, showSizeChanger: true }}
      />

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AddLeave
          onSuccess={() => {
            setIsModalVisible(false);
            leaveRequestHandler();
          }}
        />
      </Modal>
    </div>
  );
}

export default StaffLeave;
