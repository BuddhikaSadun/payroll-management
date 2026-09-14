import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeManagement = () => {
  const [profileList, setProfileList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/employee/get");

      setProfileList(response.data.profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const filteredProfileList = profileList.filter((profile) =>
    profile.personalDetails?.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="page-container">
      <h2>Employee Management</h2>

      <input
        type="text"
        placeholder="Search employee..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProfileList.map((profile) => (
              <tr key={profile._id}>
                <td>{profile.personalDetails?.name}</td>
                <td>{profile.employmentDetails?.dept}</td>
                <td>{profile.personalDetails?.contactNo}</td>
                <td>{profile.personalDetails?.email}</td>
                <td>{profile.employmentDetails?.status}</td>
                <td>
                  <button>View</button>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
