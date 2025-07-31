const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

// Optional: Prevent duplicate leave requests for the same employee and exact same date range
LeaveSchema.index(
  { employeeId: 1, startDate: 1, endDate: 1 },
  { unique: true }
);

const Leave = mongoose.model("Leave", LeaveSchema);
module.exports = Leave;
