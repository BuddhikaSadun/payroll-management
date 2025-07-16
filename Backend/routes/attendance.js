const express = require("express");
const Leave = require("../models/leave");
const Attendance = require("../modules/attendance");
const router = express.Router();

//Post request
router.post("/save", async (req, res) => {
  try {
    // Log the request
    console.log(req.body);

    // Create a new attendance record
    const attendance = new Attendance({
      employeeId: req.body.employeeId, // Referencing Employee ID
      date: req.body.date,
      status: req.body.status, // Present, Absent, On Leave
    });

    // Save the record
    const result = await attendance.save();

    // Return a successful response
    res.status(201).json({
      message: "Leave record created successfully",
      createdAttendance: {
        employeeId: result.employeeId,
        date: result.date,
        status: result.status,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create attendance/leave record",
      error: error.message,
    });
  }
});

//retreive all leave details
router.get("/", async (req, res) => {
  try {
    const docs = await Attendance.find()
      .populate("employeeId", "name email") // Populate employee details from Profile model
      .exec();

    // Create response
    const response = {
      count: docs.length,
      attendanceRecords: docs.map((result) => {
        return {
          employeeId: result.employeeId,
          date: result.date,
          status: result.status,
        };
      }),
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

//update by id
router.put("/update/:id", (req, res) => {
  Attendance.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, login) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      return res.status(200).json({
        success: "Updated successfully",
        login,
      });
    }
  );
});

//delete by id

router.delete("/delete/:id", (req, res) => {
  const pId = req.params.id;

  Attendance.findByIdAndRemove(pId).exec((err, deletedAttendance) => {
    if (err)
      return res.status(404).json({
        message: "Deleted unsuccessful",
        err,
      });

    return res.json({
      message: "Deleted successfully",
      deletedLeave,
    });
  });
});
module.exports = router;
