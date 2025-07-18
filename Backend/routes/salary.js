const express = require("express");
const Salary = require("../modules/salary.js");
const router = express.Router();
const checkAuth = require("../middleaware/check-auth.js");

router.post("/save", async (req, res) => {
  try {
    // Create a new Salary instance
    const newSalary = new Salary(req.body);

    // Save to the database
    await newSalary.save();

    res.status(201).json({
      success: "Salary saved successfully",
      createdSalary: {
        baseSalary: newSalary.baseSalary,
        overtimeHours: newSalary.overtimeHours,
        bonuses: newSalary.bonuses,
        deductions: newSalary.deductions,
        netSalary: newSalary.netSalary,
        payDate: newSalary.payDate,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err.message || "Failed to save salary record",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    // Fetch all salary records with employee details
    const salaries = await Salary.find().exec();

    // Construct response
    const response = {
      count: salaries.length,
      salaries: salaries.map((salary) => ({
        _id: salary._id,
        //employeeId: salary.employeeId, // Populated employee details
        baseSalary: salary.baseSalary,
        overtimeHours: salary.overtimeHours,
        bonuses: salary.bonuses,
        deductions: salary.deductions,
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

//update by id
router.put("/update/:id", checkAuth, (req, res) => {
  Salary.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, salary) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      return res.status(200).json({
        success: "Updated successfully",
        salary,
      });
    }
  );
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
