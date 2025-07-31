const express = require("express");
const router = express.Router();
const Leave = require("../modules/leave");

// POST: Create a new attendance/leave record
router.post("/save", async (req, res) => {
  try {
    const { employeeId, employeeName, startDate, endDate, leaveType, status } =
      req.body;

    const leave = new Leave({
      employeeId,
      employeeName,
      startDate,
      endDate,
      leaveType,
      status,
    });

    await leave.save();
    res.status(201).json({ message: "Attendance/Leave record created", leave });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Duplicate leave record for same employee and date range",
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// GET: Get all attendance/leave records
router.get("/", async (req, res) => {
  try {
    const leaves = await Leave.find().populate(
      "employeeId",
      "personalDetails.name"
    );
    res.status(200).json({ leaves });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Get attendance/leave by ID
router.get("/:id", async (req, res) => {
  try {
    const leaves = await Leave.findById(req.params.id).populate(
      "employeeId",
      "personalDetails.name"
    );
    if (!leaves) return res.status(404).json({ error: "Record not found" });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// GET: Get leave by employee ID
router.get("/:empId", async (req, res) => {
  try {
    const { empId } = req.params;
    const leaves = await Leave.find({ employeeId: empId }).populate(
      "employeeId",
      "personalDetails.name"
    );
    res.status(200).json({ count: leaves.length, leaves });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update attendance/leave status by ID
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("employeeId", "personalDetails.name");

    if (!updatedLeave) {
      return res.status(404).json({ error: "Leave record not found" });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete attendance/leave by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Leave.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Record not found" });
    res.json({ message: "Record deleted", deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
