import React from "react";

const LeaveManagement = () => {
  return (
    <div className="page-container">
      <h2>Leave Management</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>{/* Leave data here */}</tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;
