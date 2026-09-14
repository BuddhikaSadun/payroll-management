import React from "react";

const SalaryManagement = () => {
  return (
    <div className="page-container">
      <h2>Salary Management</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Basic Salary</th>
              <th>Allowances</th>
              <th>Deductions</th>
              <th>Net Salary</th>
            </tr>
          </thead>

          <tbody>{/* Salary data here */}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryManagement;
