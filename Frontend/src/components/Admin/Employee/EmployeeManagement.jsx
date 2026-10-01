import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Modal } from "antd";
const API_URL = import.meta.env.VITE_API_URL;
import "../../../assets/Admin/Profile/AdminProfile.css";
import AddStaff from "./AddStaff.jsx";
import UpdateStaff from "./UpdateStaff.jsx";

const EmployeeManagement = () => {
  const [profileList, setProfileList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openUpdateModal = (profile) => {
    setSelectedEmployee(profile);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedEmployee(null);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`${API_URL}/employee/get`);

      setProfileList(response.data.profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(
        `${API_URL}/employee/update/${updatedData._id}`,
        updatedData,
      );
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `Employee updated successfully!`,
      });
      closeUpdateModal();
    } catch (error) {
      console.error("Error updating employee:", error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: `Failed to update employee!`,
      });
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/employee/delete/${id}`);
      alert("Employee deleted successfully.");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const filteredProfileList = profileList.filter((profile) =>
    profile.personalDetails?.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="page-container">
      <div className="table-wrapper">
        <div className="header-search-add-employee">
          <Input
            style={{ width: "400px" }}
            type="text"
            placeholder="Search employee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="primary"
            size="large"
            icon={<FontAwesomeIcon icon={faUserPlus} />}
            onClick={openAddModal}
          >
            Add Employee
          </Button>
          <Modal
            title="Add Employee"
            open={isAddModalOpen}
            onCancel={closeAddModal}
            footer={null}
            destroyOnClose={true}
          >
            <AddStaff />
          </Modal>
        </div>

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
                <td className="employee-actions">
                  <Button
                    type="primary"
                    size="middle"
                    className="edit-button"
                    icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    onClick={() => openUpdateModal(profile)}
                  >
                    Edit
                  </Button>
                  <Modal
                    title="Update Employee"
                    open={isUpdateModalOpen}
                    onCancel={closeUpdateModal}
                    footer={null}
                    destroyOnClose={true}
                  >
                    {selectedEmployee && (
                      <UpdateStaff
                        initialValues={selectedEmployee}
                        onUpdate={handleUpdate}
                      />
                    )}
                  </Modal>

                  <Button
                    danger
                    size="middle"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    onClick={() => handleDelete(profile._id)}
                  >
                    Delete
                  </Button>
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
