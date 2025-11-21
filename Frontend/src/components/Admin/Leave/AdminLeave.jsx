import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table, message, DatePicker } from "antd";
import { Select } from "antd";
const { Option } = Select;

import "../../../assets/Admin/Leave/AdminLeave.css";
import NavBar from "../../NavBar";

function AdminLeave() {
  const [loading, setLoading] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    leaveRequestHandler();
  }, []);

  const leaveRequestHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/leave/");
      //console.log(response.data.leaves);
      setLeaveData(response.data.leaves);
      setFilteredData(response.data.leaves);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (date) => {
    if (!date) {
      setFilteredData(leaveData); // Reset to full list
      return;
    }

    const selectedMonth = date.month();
    const selectedYear = date.year();

    const filtered = leaveData.filter((leave) => {
      const leaveMonth = new Date(leave.startDate).getMonth();
      const leaveYear = new Date(leave.startDate).getFullYear();
      return leaveMonth === selectedMonth && leaveYear === selectedYear;
    });

    setFilteredData(filtered);
  };

  // New function to update status using PUT request
  const handleStatusChange = async (leaveId, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/leave/${leaveId}/status`, {
        status: newStatus,
      });
      message.success("Status updated successfully!");
      leaveRequestHandler(); // Refresh table
    } catch (error) {
      console.error("Failed to update status:", error.message);
      alert("Error updating status.");
    }
  };

  // Update your LeaveColumns with a select dropdown
  const LeaveColumns = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
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
      render: (status, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Select
            value={status}
            style={{ width: 120 }}
            onChange={(value) => handleStatusChange(record._id, value)}
            disabled={status === "Approved" || status === "Rejected"}
          >
            <Option value="Pending">Pending</Option>
            <Option value="Approved">Approved</Option>
            <Option value="Rejected">Rejected</Option>
          </Select>
        </div>
      ),
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="leave-bg">
        <h2 style={{ textAlign: "center", paddingBottom: "40px" }}>
          Employee Leave Requests
        </h2>
        <div className="leave-container">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              padding: "40px",
            }}
          >
            <DatePicker
              onChange={handleMonthChange}
              picker="month"
              placeholder="Filter by Month"
              allowClear
            />
          </div>

          <Table
            loading={loading}
            dataSource={filteredData.map((leave) => ({
              ...leave,
              key: leave._id,
              employeeName: leave.employeeName || "N/A",
            }))}
            columns={LeaveColumns}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminLeave;
