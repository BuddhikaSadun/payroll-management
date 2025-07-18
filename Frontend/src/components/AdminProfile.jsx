import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Input, Modal } from "antd";

const { Search } = Input;
import "../assets/AdminProfile.css";

import AddStaff from "./AddStaff";
import UpdateStaff from "./UpdateStaff";
import NavBar from "../components/NavBar";

const AdminProfile = () => {
  const [profileList, setProfileList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/employee/get");
      console.log("Profiles fetched from API:", response.data.profiles);
      setProfileList(response.data.profiles);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
    console.log("Delete handler called with ID:", id);

    try {
      await axios.delete(`http://localhost:8000/employee/delete/${id}`);
      alert("Successfully deleted!");
      fetchProfiles(); // Refresh the profile list after deletion
    } catch (error) {
      console.error(
        "Error deleting profile:",
        error.response?.data || error.message
      );
      alert("Failed to delete profile. Please try again.");
    }
  };

  const updateHandler = async (updatedProfile) => {
    try {
      await axios.put(
        `http://localhost:8000/employee/update/${updatedProfile._id}`,
        updatedProfile
      );
      alert("Profile updated successfully!");
      fetchProfiles();
      setIsModalVisible(false);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      alert("Failed to update profile. Please try again.");
    }
  };

  // Filtering based on search query
  const filteredProfileList =
    Array.isArray(profileList) && profileList.length > 0
      ? profileList.filter((profile) =>
          profile.personalDetails?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : [];

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => name || "-",
    },
    {
      title: "Dept",
      dataIndex: "dept",
      key: "dept",
      align: "center",
      render: (name) => name || "-",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
      align: "center",
      render: (name) => name || "-",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (name) => name || "-",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="action-buttons">
          <Button
            color="danger"
            variant="solid"
            onClick={() => deleteHandler(record._id)}
          >
            Delete
          </Button>
          <Button
            color="green"
            variant="solid"
            onClick={() => {
              console.log("Selected Employee ID:", record._id); // 🔍 Log the ID here
              setSelectedProfile({
                _id: record._id,
                personalDetails: {
                  name: record.name,
                  email: record.email,
                  contactNo: record.contactNo,
                },
                employmentDetails: {
                  dept: record.dept,
                  status: record.status,
                  designation: record.designation,
                },
              });
              setIsEditing(true);
              setIsModalVisible(true);
            }}
          >
            Update
          </Button>
        </div>
      ),
    },
  ];
  const dataSource = filteredProfileList.map((profile) => ({
    _id: profile._id,
    name: profile.personalDetails?.name,
    dept: profile.employmentDetails?.dept,
    contactNo: profile.personalDetails?.contactNo,
    email: profile.personalDetails?.email,
    status: profile.employmentDetails?.status,
  }));

  return (
    <div className="admin-profile-container">
      <NavBar />
      <div className="admin-profile-wrapper">
        <h2 className="title">Employee Details</h2>

        {/* Grouped top actions */}
        <div className="top-actions">
          <Search
            placeholder="Search by name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(value) => setSearchQuery(value)}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: 400 }}
          />

          <Button
            type="primary"
            size="large"
            onClick={() => setIsModalVisible(true)}
          >
            Add Staff
          </Button>
        </div>

        <Table
          dataSource={dataSource}
          columns={columns}
          className="staffTable"
          rowKey="_id"
        />

        <Modal
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setIsEditing(false);
            setSelectedProfile(null);
          }}
          footer={null}
        >
          {isEditing ? (
            <UpdateStaff
              initialValues={selectedProfile}
              onClose={() => {
                setIsModalVisible(false);
                setIsEditing(false);
                setSelectedProfile(null);
              }}
              onUpdate={updateHandler}
            />
          ) : (
            <AddStaff
              onClose={() => setIsModalVisible(false)}
              onAdd={fetchProfiles}
              profileList={profileList}
            />
          )}
        </Modal>
      </div>
      <footer className="text-center mt-8 text-gray-600">
        Designed by Buddhika Sadun
      </footer>
    </div>
  );
};
export default AdminProfile;
