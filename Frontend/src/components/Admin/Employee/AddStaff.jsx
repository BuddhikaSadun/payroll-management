import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import "../../../assets/Staff/Profile/AddStaff.css"; // Your CSS file here
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_API_URL;

const AddStaff = ({ isOpen }) => {
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgFile, setProfileImgFile] = useState(null);
  const [ImgError, setImgError] = useState("");

  const formikRef = useRef(null);
  useEffect(() => {
    if (!isOpen) {
      formikRef.current?.resetForm();

      setProfileImg(null);
      setProfileImgFile(null);
      setImgError("");
    }
  }, [isOpen]);

  // Validation schema using Yup
  const validationSchema = yup.object({
    personalDetails: yup.object({
      name: yup
        .string()
        .required("Name is required")
        .matches(/^[A-Za-z\s]+$/, "Invalid naming format"),
      email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),
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
    const file = event.target.files?.[0];

    if (!file) {
      setProfileImg(null);
      setProfileImgFile(null);
      return;
    }

    if (file.type === "image/png" || file.type === "image/jpeg") {
      setImgError("");
      setProfileImgFile(file);
      setProfileImg(URL.createObjectURL(file));
    } else {
      setImgError("Only PNG and JPEG images are allowed");
      setProfileImg(null);
      setProfileImgFile(null);
      event.target.value = "";
    }
  };
  // Submit form data
  const handleSubmit = async (values, { resetForm }) => {
    if (ImgError) {
      alert(ImgError);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(values));

      if (profileImgFile) {
        formData.append("img", profileImgFile);
      }

      await axios.post(`${API_URL}/employee/save`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Success",
        icon: "success",
        text: `Successfully Created Staff!`,
      });

      resetForm();
      setProfileImg(null);
      setProfileImgFile(null);
      setImgError("");
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: `Failed to add staff!`,
      });
    }
  };

  return (
    <div className="addstaff-container">
      <div className="addstaff-wrapper">
        <Formik
          innerRef={formikRef}
          initialValues={{
            personalDetails: {
              name: "",
              email: "",
              contactNo: "",
            },
            employmentDetails: {
              status: "",
              dept: "",
              designation: "",
            },
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
                  placeHolder="eg:- John Doe"
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
                  placeHolder="eg:- john@example.com"
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
                  placeholder="eg:- Human Resources"
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
                  placeholder="eg:- 0## - #######"
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
                {ImgError && <div className="addstaff-error">{ImgError}</div>}
              </div>

              <div className="addstaff-buttons">
                <button type="submit" className="addstaff-btn-blue">
                  Add Staff
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
