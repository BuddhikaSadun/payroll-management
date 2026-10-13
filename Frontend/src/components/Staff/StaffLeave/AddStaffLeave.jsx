import React, { useEffect, useState } from "react";
import { Alert, DatePicker, TimePicker, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import "../../../assets/Staff/Leave/StaffAddLeave.css"; // Your CSS file here
const API_URL = import.meta.env.VITE_API_URL;

const { RangePicker } = DatePicker;
const leaveTypes = ["Full-Day", "Half-Day"];

function AddStaffLeave({ employeeId, employeeName, onSuccess }) {
  const [dateRange, setDateRange] = useState([]);
  const [selectedLeaveType, setSelectedLeaveType] = useState("");

  const handleRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !employeeId ||
      !employeeName ||
      !dateRange ||
      dateRange.length !== 2 ||
      !selectedLeaveType
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    try {
      console.log("Submitting leave request data:", {
        employeeId: selectedEmp._id,
        employeeName: selectedEmp.name,
        startDate: dayjs(dateRange[0]).toISOString(),
        endDate: dayjs(dateRange[1]).toISOString(),
        leaveType: selectedLeaveType,
        status: "Pending",
      });

      const response = await axios.post(`${API_URL}/leave/save`, {
        employeeId: selectedEmp._id,
        employeeName,
        startDate: dayjs(dateRange[0]).toISOString(),
        endDate: dayjs(dateRange[1]).toISOString(),
        leaveType: selectedLeaveType,
        status: "Pending",
      });
      console.log("Leave request submitted:", response.data);
      message.success("Leave request submitted!");

      // Reset form
      setDateRange([]);
      setSelectedLeaveType("");

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Submission error:", error.message);
      message.error("Failed to submit leave request.");
    }
  };

  return (
    <div className="leave-form-wrapper">
      <h2>Leave Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="input-label">Employee Name</label>
          <input
            type="text"
            id="employeeName"
            value={employeeName || ""}
            placeholder="Employee Name"
            className="input-field"
            disabled
          />
        </div>

        <div className="input-container">
          <label className="input-label">Date Range</label>
          <RangePicker
            onChange={handleRangeChange}
            size="large"
            value={dateRange}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label className="input-label">Leave Type</label>
          <select
            className="input-field"
            value={selectedLeaveType}
            onChange={(e) => setSelectedLeaveType(e.target.value)}
          >
            <option value="">Select Leave Type</option>
            {leaveTypes.map((leave, index) => (
              <option key={index} value={leave}>
                {leave}
              </option>
            ))}
          </select>
        </div>
        <center>
          <input type="submit" value="Submit" className="submit-btn" />
        </center>
      </form>
    </div>
  );
}

export default AddStaffLeave;
