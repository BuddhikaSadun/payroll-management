import React, { useEffect, useState } from "react";
import { Alert, DatePicker, TimePicker, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import "../../../assets/Staff/Leave/StaffAddLeave.css"; // Your CSS file here

const { RangePicker } = DatePicker;

const leaveTypes = ["Full-Day", "Half-Day"];

function AddStaffLeave({ onSuccess }) {
  const [dateRange, setDateRange] = useState([]);
  const [empNames, setEmpNames] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedLeaveType, setSelectedLeaveType] = useState("");

  const fetchEmployeeNames = async () => {
    try {
      const response = await axios.get("http://localhost:8000/employee/get");
      const employees = response.data.profiles;

      const formatted = employees.map((emp) => ({
        _id: emp._id,
        name: emp.personalDetails?.name || "Unnamed",
      }));

      setEmpNames(formatted);
    } catch (error) {
      console.error("Failed to fetch employees", error.message);
    }
  };

  useEffect(() => {
    fetchEmployeeNames();
  }, []);

  const handleRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !dateRange ||
      dateRange.length !== 2 ||
      !selectedEmployee ||
      !selectedLeaveType
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    const selectedEmp = empNames.find((emp) => emp._id === selectedEmployee);
    if (!selectedEmp) {
      message.error("Selected employee not found.");
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

      const response = await axios.post("http://localhost:8000/leave/save", {
        employeeId: selectedEmp._id,
        employeeName: selectedEmp.name || selectedEmp.personalDetails?.name,
        startDate: dayjs(dateRange[0]).toISOString(),
        endDate: dayjs(dateRange[1]).toISOString(),
        leaveType: selectedLeaveType,
        status: "Pending",
      });
      console.log("Leave request submitted:", response.data);
      message.success("Leave request submitted!");

      // Reset form
      setDateRange([]);
      setSelectedEmployee("");
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
          <select
            className="input-field"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {empNames.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
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

        <input type="submit" value="Submit" className="submit-btn" />
      </form>
    </div>
  );
}

export default AddStaffLeave;
