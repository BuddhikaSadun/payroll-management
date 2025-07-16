const mongoose = require("mongoose");
const SalarySchema = new mongoose.Schema({
  baseSalary: { type: Number, required: true },
  overtimeHours: { type: Number },
  bonuses: { type: Number },
  deductions: { type: Number },
  netSalary: { type: Number },
  payDate: { type: Date, default: Date.now },
});

SalarySchema.pre("save", function (next) {
  this.netSalary =
    this.baseSalary +
    this.bonuses -
    this.deductions +
    (this.overtimeHours * this.baseSalary) / 160; // Assuming 160 work hours/month
  next();
});

const Salary = mongoose.model("Salary", SalarySchema);
module.exports = Salary;
