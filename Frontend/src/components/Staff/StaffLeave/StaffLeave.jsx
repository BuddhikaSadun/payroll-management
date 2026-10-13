import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Modal, Button, Table, Alert, message } from "antd";
import AddLeave from "./AddStaffLeave.jsx";
const API_URL = import.meta.env.VITE_API_URL;
import "../../../assets/commonTable.css";

function StaffLeave({ employeeId, employeeName }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [leaveData, setLeaveData] = useState([]);

  const fetchLeaveDetails = useCallback(async () => {
    if (!employeeId) return;

    try {
      const leaveRes = await axios.get(`${API_URL}/leave/${employeeId}`);

      setLeaveData(leaveRes.data.leaves || []);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchLeaveDetails();
  }, [fetchLeaveDetails]);

  const deleteLeaveHandler = async (id) => {
    try {
      await axios.delete(`${API_URL}/leave/delete/${id}`);
      alert("Successfully Deleted!");
      leaveRequestHandler(); // Refresh table after delete
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
        <span style={{ fontSize: "16px", fontWeight: "normal" }}>
          {new Date(date).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => (
        <span style={{ fontSize: "16px" }}>
          {new Date(date).toLocaleDateString()}
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
      <h2 className="staff-section-title">Employee Leaves</h2>

      <Table
        className="staff-table"
        dataSource={leaveData.map((leave) => ({
          ...leave,
          key: leave._id,
          employeeName: leave.employeeName || "N/A",
        }))}
        columns={LeaveColumns}
      />

      <Button
        type="primary"
        size="large"
        onClick={() => setIsModalVisible(true)}
        className="staff-action-button"
      >
        Add Leave
      </Button>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AddLeave
          employeeId={employeeId}
          employeeName={employeeName}
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
