import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import "../assets/AddStaff.css";

const AddStaff = () => {
  const [profileImg, setProfileImg] = useState(null);
  const { loginid } = useParams(); // Retrieve loginid from URL parameters
  console.log("Login ID from URL:", loginid);

  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = yup.object({
    personalDetails: yup.object({
      name: yup
        .string()
        .required("Name is required")
        .matches(/^[A-Za-z\s]+$/, "Invalid naming format"),
      email: yup.string().required("Email is required").email(),
      contactNo: yup
        .string()
        .matches(/^\d{3}-\d{7}$/, "Invalid contact number format")
        .required("Contact number is required"),
    }),
    employmentDetails: yup.object({
      dept: yup.string().required("Department is required"),
      status: yup
        .string()
        .required("Employment status is required")
        .oneOf(["full-time", "part-time", "internship"]),
      designation: yup.string().required("Designation is required"),
    }),
  });

  // Handle image upload
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setProfileImg(URL.createObjectURL(img));
    }
  };
  // Submit form data
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      // Send the entire object as a single JSON string
      formData.append("data", JSON.stringify(values));

      // Attach image if selected
      if (profileImg) {
        const imageFileInput = document.querySelector('input[type="file"]');
        if (imageFileInput && imageFileInput.files.length > 0) {
          formData.append("img", imageFileInput.files[0]);
        }
      }

      await axios.post("http://localhost:8000/employee/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Successfully created!");
      resetForm();
      setProfileImg(null);
    } catch (error) {
      console.error(error.message);
      alert("Failed to add staff");
    }
  };

  return (
    <div className="addstaff-container">
      <div className="addstaff-wrapper">
        <h1 className="addstaff-title">Employee Registration</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            contactNo: "",
            status: "",
            dept: "",
            designation: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="addstaff-form">
              <div>
                <label className="addstaff-label">Name</label>
                <Field
                  name="personalDetails.name"
                  type="text"
                  className="addstaff-input"
                />
                <ErrorMessage
                  name="personalDetails.name"
                  component="div"
                  className="addstaff-error"
                />
              </div>

              <div>
                <label className="addstaff-label">Email</label>
                <Field
                  name="personalDetails.email"
                  type="text"
                  className="addstaff-input"
                />
                <ErrorMessage
                  name="personalDetails.email"
                  component="div"
                  className="addstaff-error"
                />
              </div>

              <div>
                <label className="addstaff-label">Select Designation</label>
                <Field
                  name="employmentDetails.designation"
                  as="select"
                  className="addstaff-select"
                >
                  <option value="">Select Designation</option>
                  <option value="assistant">Assistant</option>
                  <option value="officer">Officer</option>
                  <option value="manager">Manager</option>
                </Field>
                <ErrorMessage
                  name="employmentDetails.designation"
                  component="div"
                  className="addstaff-error"
                />
              </div>

              <div>
                <label className="addstaff-label">Employment Status</label>
                <Field
                  name="employmentDetails.status"
                  as="select"
                  className="addstaff-select"
                >
                  <option value="">Select Status</option>
                  <option value="full-time">full-time</option>
                  <option value="part-time">part-time</option>
                  <option value="internship">internship</option>
                </Field>
                <ErrorMessage
                  name="employmentDetails.status"
                  component="div"
                  className="addstaff-error"
                />
              </div>

              <div>
                <label className="addstaff-label">Department</label>
                <Field
                  name="employmentDetails.dept"
                  type="text"
                  className="addstaff-input"
                />
                <ErrorMessage
                  name="employmentDetails.dept"
                  component="div"
                  className="addstaff-error"
                />
              </div>

              <div>
                <label className="addstaff-label">Contact Number</label>
                <Field
                  name="personalDetails.contactNo"
                  type="text"
                  className="addstaff-input"
                />
                <ErrorMessage
                  name="personalDetails.contactNo"
                  component="div"
                  className="addstaff-error"
                />
              </div>

              <div>
                <label className="addstaff-label">Upload Profile Picture</label>
                <input
                  type="file"
                  onChange={onImageChange}
                  className="addstaff-file"
                />
                {profileImg && (
                  <img
                    src={profileImg}
                    alt="Preview"
                    className="addstaff-img-preview"
                  />
                )}
              </div>

              <div className="addstaff-buttons">
                <button type="submit" className="addstaff-btn-blue">
                  Add Staff
                </button>
                <button
                  type="button"
                  className="addstaff-btn-green"
                  onClick={() => navigate(`/staff/${loginid}`)}
                >
                  Home
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddStaff;
