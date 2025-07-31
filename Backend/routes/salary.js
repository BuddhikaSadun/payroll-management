const express = require("express");
const Salary = require("../modules/salary.js");
const Employee = require("../modules/employee.js");
const router = express.Router();
const checkAuth = require("../middleaware/check-auth.js");

router.post("/save", async (req, res) => {
  try {
    const { empId, baseSalary, leaveDays = 0, bonuses = 0, payDate } = req.body;

    // Calculate net salary on server
    const workingDaysPerMonth = 22;
    const leaveDeduction = (baseSalary / workingDaysPerMonth) * leaveDays;
    const netSalary = baseSalary + bonuses - leaveDeduction;

    const salary = new Salary({
      empId,
      payDate,
      baseSalary,
      leaveDays,
      bonuses,
      netSalary,
    });

    const saved = await salary.save();

    res.status(201).json({
      message: "Salary record saved successfully",
      salary: saved,
    });
  } catch (err) {
    console.error("Salary save failed:", err);
    res.status(500).json({ error: err.message });
  }
});
// Get all salaries
router.get("/", async (req, res) => {
  try {
    const salaries = await Salary.find().populate(
      "empId",
      "personalDetails.name"
    ); // adjust field as needed
    res.status(200).json({ salaries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:empId", async (req, res) => {
  try {
    const { empId } = req.params;
    const salaries = await Salary.find({ empId }).populate("empId").exec();

    // Construct response
    const response = {
      count: salaries.length,
      salaries: salaries.map((salary) => ({
        _id: salary._id,
        empId: salary.empId,
        baseSalary: salary.baseSalary,
        leaveDays: salary.leaveDays,
        bonuses: salary.bonuses,
        netSalary: salary.netSalary,
        payDate: salary.payDate,
      })),
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Failed to fetch salary records",
    });
  }
});

router.get("/email/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // 1. Find employee by email
    const employee = await Employee.findOne({ "personalDetails.email": email });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2. Find salaries for that employee
    const salaries = await Salary.find({ empId: employee._id });

    res.status(200).json({ salaries });
  } catch (err) {
    console.error("Error fetching salary by email:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// routes/salary.js or employee.js
router.put("/salary/update/:id", async (req, res) => {
  try {
    const updatedSalary = await Salary.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedSalary) {
      return res.status(404).json({ error: "Salary record not found" });
    }

    res.status(200).json({
      success: "Salary updated successfully",
      salary: updatedSalary,
    });
  } catch (err) {
    console.error("Update salary error:", err);
    res.status(500).json({ error: "Failed to update salary" });
  }
});

//delete by id

router.delete("/delete/:id", (req, res) => {
  const pId = req.params.id;

  Salary.findByIdAndRemove(pId).exec((err, deletedSalary) => {
    if (err)
      return res.status(404).json({
        message: "Deleted unseccesfull",
        err,
      });

    return res.json({
      message: "Deleted successfully",
      deletedSalary,
    });
  });
});
module.exports = router;
