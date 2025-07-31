import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import NavBar from "../../NavBar";
import "../../../assets/Admin/Salary/AdminSalaryAll.css"; // Assuming you have a CSS file for styling
export default function SalaryAll() {
  const [loading, setLoading] = useState(false);
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/salary/");
      setSalaryData(res.data.salaries || []);
    } catch (error) {
      console.error("Error fetching salaries:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const salaryColumns = [
    {
      title: "Employee Name",
      dataIndex: ["empId", "personalDetails", "name"],
      key: "employeeName",
      render: (_, record) => record.empId?.personalDetails?.name || "Unknown",
    },
    {
      title: "Base Salary",
      dataIndex: "baseSalary",
      key: "baseSalary",
    },
    {
      title: "Leave Days",
      dataIndex: "leaveDays",
      key: "leaveDays",
    },
    {
      title: "Bonuses",
      dataIndex: "bonuses",
      key: "bonuses",
    },
    {
      title: "Net Salary",
      dataIndex: "netSalary",
      key: "netSalary",
      render: (value) => value?.toFixed(2),
    },
    {
      title: "Pay Date",
      dataIndex: "payDate",
      key: "payDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="salary-background">
      <NavBar />
      <div className="salary-container" style={{ padding: "20px" }}>
        <h2>All Salaries</h2>
        <Table
          loading={loading}
          pagination={{ pageSize: 10 }}
          dataSource={salaryData.map((s) => ({ ...s, key: s._id }))}
          columns={salaryColumns}
        />
      </div>
    </div>
  );
}
