const mongoose = require("mongoose");
const SalarySchema = new mongoose.Schema({
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // This should match your Employee model name
    required: true,
  },
  baseSalary: { type: Number, required: true },
  leaveDays: { type: Number, default: 0 },
  bonuses: { type: Number, default: 0 },
  netSalary: { type: Number },
  payDate: { type: Date, default: Date.now },
});

const Salary = mongoose.model("Salary", SalarySchema);
module.exports = Salary;
