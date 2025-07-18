import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import "../assets/UpdateStaff.css"; // Your CSS file here

const UpdateStaff = ({ initialValues, onClose, onUpdate }) => {
  const [profileImg, setProfileImg] = useState(null);

  const navigate = useNavigate();

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

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const updatedData = {
        ...values,
        _id: initialValues._id, // attach ID here
      };

      await onUpdate(updatedData); // call parent handler

      resetForm();
      setProfileImg(null);
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed");
    }
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setProfileImg(URL.createObjectURL(img));
    }
  };

  return (
    <div className="update-staff-container">
      <div className="update-staff-wrapper">
        <h1 className="update-staff-title">Employee Update</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {() => (
            <Form className="update-staff-form">
              {/* Name */}
              <div>
                <label className="update-staff-label">Name</label>
                <Field
                  name="personalDetails.name"
                  type="text"
                  className="update-staff-input"
                />
                <ErrorMessage
                  name="personalDetails.name"
                  component="div"
                  className="update-staff-error"
                />
              </div>

              {/* Email */}
              <div>
                <label className="update-staff-label">Email</label>
                <Field
                  name="personalDetails.email"
                  type="text"
                  className="update-staff-input"
                />
                <ErrorMessage
                  name="personalDetails.email"
                  component="div"
                  className="update-staff-error"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="update-staff-label">Select Designation</label>
                <Field
                  name="employmentDetails.designation"
                  as="select"
                  className="update-staff-select"
                >
                  <option value="">Select Designation</option>
                  <option value="assistant">Assistant</option>
                  <option value="officer">Officer</option>
                  <option value="manager">Manager</option>
                </Field>
                <ErrorMessage
                  name="employmentDetails.designation"
                  component="div"
                  className="update-staff-error"
                />
              </div>

              {/* Employment Status */}
              <div>
                <label className="update-staff-label">Employment Status</label>
                <Field
                  name="employmentDetails.status"
                  as="select"
                  className="update-staff-select"
                >
                  <option value="">Select Status</option>
                  <option value="full-time">full-time</option>
                  <option value="part-time">part-time</option>
                  <option value="internship">internship</option>
                </Field>
                <ErrorMessage
                  name="employmentDetails.status"
                  component="div"
                  className="update-staff-error"
                />
              </div>

              {/* Department */}
              <div>
                <label className="update-staff-label">Department</label>
                <Field
                  name="employmentDetails.dept"
                  type="text"
                  className="update-staff-input"
                />
                <ErrorMessage
                  name="employmentDetails.dept"
                  component="div"
                  className="update-staff-error"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="update-staff-label">Contact Number</label>
                <Field
                  name="personalDetails.contactNo"
                  type="text"
                  className="update-staff-input"
                />
                <ErrorMessage
                  name="personalDetails.contactNo"
                  component="div"
                  className="update-staff-error"
                />
              </div>

              {/* Profile Image */}
              <div>
                <label className="update-staff-label">
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  onChange={onImageChange}
                  className="update-staff-file"
                />
                {profileImg && (
                  <img
                    src={profileImg}
                    alt="Preview"
                    className="update-staff-img-preview"
                  />
                )}
              </div>

              {/* Buttons */}
              <div className="update-staff-buttons">
                <button type="submit" className="update-staff-btn-blue">
                  Update Staff
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="update-staff-btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateStaff;
