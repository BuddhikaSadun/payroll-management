import React, { useState, useEffect } from "react";
import { Table } from "antd";
import "../../../assets/commonTable.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function StaffSalary() {
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email"); // Make sure email is stored
    if (email) {
      fetchSalaryByEmail(email);
      leaveRequestHandler(email);
    }
  }, []);

  const fetchSalaryByEmail = async (email) => {
    try {
      const response = await axios.get(`${API_URL}/salary/email/${email}`);
      console.log(response.data.salaries);
      setSalaryData(response.data.salaries);
    } catch (error) {
      console.error("Error fetching salary:", error.message);
    }
  };
  return (
    <div className="staff-section">
      <h2 className="staff-section-title">Salary Information</h2>

      <Table
        className="staff-table"
        dataSource={salaryData.map((salary) => ({
          ...salary,
          key: salary._id,
        }))}
        columns={[
          {
            title: "Month",
            dataIndex: "month",
            key: "month",
          },
          {
            title: "Net Salary",
            dataIndex: "netSalary",
            key: "netSalary",
            render: (val) => `Rs. ${val}`,
          },
          {
            title: "Paid Date",
            dataIndex: "paidDate",
            key: "paidDate",
            render: (date) => new Date(date).toLocaleDateString(),
          },
        ]}
      />
    </div>
  );
}
