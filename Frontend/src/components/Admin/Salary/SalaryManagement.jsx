import { useState, useEffect } from "react";
import { Button, Input, Modal } from "antd";
import AdminSalary from "./AdminSalary.jsx";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const SalaryManagement = () => {
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [salaryList, setSalaryList] = useState([]);

  const fetchSalary = async () => {
    try {
      const response = await axios.get("http://localhost:8000/salary");

      setSalaryList(response.data.salaries);
    } catch (error) {
      console.error("Error fetching salaries:", error);
    }
  };
  useEffect(() => {
    fetchSalary();
  }, []);

  const openSalaryModal = () => {
    setIsSalaryModalOpen(true);
  };
  const closeSalaryModal = () => {
    setIsSalaryModalOpen(false);
  };
  /*
  const filteredSalary = salaryList.filter((salary) =>
    salary.empId?.personalDetails?.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );*/

  return (
    <div className="page-container">
      <h2>Salary Management</h2>

      <div className="table-wrapper">
        <Button
          type="primary"
          size="large"
          icon={<FontAwesomeIcon icon={faUserPlus} />}
          onClick={openSalaryModal}
        >
          Calculate Salary
        </Button>
        <Modal
          title="Calculate Salary"
          open={isSalaryModalOpen}
          onCancel={closeSalaryModal}
          footer={null}
          destroyOnClose={true}
        >
          <AdminSalary />
        </Modal>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Basic Salary</th>
              <th>Leave Days</th>
              <th>Bonuses</th>
              <th>Pay Date</th>
              <th>Net Salary</th>
            </tr>
          </thead>

          <tbody>
            {salaryList.map((salary) => (
              <tr key={salary._id}>
                <td>{salary.empId?.personalDetails?.name || "Unknown"}</td>

                <td>{salary.baseSalary}</td>

                <td>{salary.leaveDays}</td>

                <td>{salary.bonuses}</td>

                <td>
                  {salary.payDate
                    ? new Date(salary.payDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>{salary.netSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryManagement;
