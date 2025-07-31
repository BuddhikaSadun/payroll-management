const express = require("express");
const Employee = require("../modules/employee.js");
const router = express.Router();
const multer = require("multer");

//const checkAuth = require("../middleware/check-auth.js");
//const upload =multer({dest:'./uploads/'});

//configure the way of storing file

const storage = multer.diskStorage({
  // destination: function(req, file, cb){
  //   cb(null,'./uploads/');
  //},
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

// setting to accept files with extension jpeg/png only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//upload varibale to define localstorage of file

const upload = multer({
  dest: "./uploads/",
  //storage:storage,
  limits: { fileSize: 1024 * 1024 * 5 }, //size limit-less than 5MB
  fileFilter: fileFilter,
});

//Routes

router.post("/save", upload.single("img"), async (req, res) => {
  try {
    console.log("Request body raw:", req.body);
    console.log("Uploaded file:", req.file);

    // Parse the nested object
    const data = JSON.parse(req.body.data);

    const employee = new Employee({
      personalDetails: {
        name: data.personalDetails.name,
        email: data.personalDetails.email,
        contactNo: data.personalDetails.contactNo,
      },
      employmentDetails: {
        status: data.employmentDetails.status,
        workSchedule: data.employmentDetails.workSchedule,
        dept: data.employmentDetails.dept,
        designation: data.employmentDetails.designation,
      },
      img: req.file ? req.file.path : undefined,
    });

    const result = await employee.save();
    res.status(201).json({
      success: true,
      message: "Created employee successfully",
      createdEmployee: result,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create profile",
      error: error.message,
    });
  }
});

//retrieve a  single record by id
router.get("get/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id).exec();
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ data: employee, success: "successfully retrieved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single staff profile by email
router.get("/profile/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const employee = await Employee.findOne({ "personalDetails.email": email }); // ✅ correct path
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//retreive all employee details

router.get("/get", async (req, res) => {
  try {
    const employees = await Employee.find().exec();
    const response = {
      count: employees.length,
      profiles: employees.map((employee) => ({
        _id: employee._id,
        personalDetails: {
          name: employee.personalDetails?.name,
          email: employee.personalDetails?.email,
          contactNo: employee.personalDetails?.contactNo,
        },
        employmentDetails: {
          status: employee.employmentDetails?.status,
          workSchedule: employee.employmentDetails?.workSchedule,
          dept: employee.employmentDetails?.dept,
          designation: employee.employmentDetails?.designation,
        },
        img: employee.img,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve employees",
      error: error.message,
    });
  }
});

//update by id
router.put("/update/:id", async (req, res) => {
  try {
    const updateFields = {};

    // Support both nested (personalDetails: {...}) and flat (name, contactNo)
    const name = req.body.name || req.body.personalDetails?.name;
    const email = req.body.email || req.body.personalDetails?.email;
    const contactNo = req.body.contactNo || req.body.personalDetails?.contactNo;

    if (name) updateFields["personalDetails.name"] = name;
    if (email) updateFields["personalDetails.email"] = email;
    if (contactNo) updateFields["personalDetails.contactNo"] = contactNo;

    const status = req.body.status || req.body.employmentDetails?.status;
    const workSchedule =
      req.body.workSchedule || req.body.employmentDetails?.workSchedule;
    const dept = req.body.dept || req.body.employmentDetails?.dept;
    const designation =
      req.body.designation || req.body.employmentDetails?.designation;

    if (status) updateFields["employmentDetails.status"] = status;
    if (workSchedule)
      updateFields["employmentDetails.workSchedule"] = workSchedule;
    if (dept) updateFields["employmentDetails.dept"] = dept;
    if (designation)
      updateFields["employmentDetails.designation"] = designation;

    if (req.file) {
      updateFields.img = req.file.path;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update Employee",
      error: error.message,
    });
  }
});

//delete by id

router.delete("/delete/:id", async (req, res) => {
  const pId = req.params.id;

  try {
    const deletedEmployee = await Employee.findByIdAndRemove(pId);

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found. Deletion unsuccessful.",
      });
    }

    return res.status(201).json({
      message: "Employee deleted successfully.",
      deletedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while deleting the Employee.",
      error: error.message,
    });
  }
});

module.exports = router;
