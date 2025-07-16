const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    index: true, // Index to optimize date-based queries
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "On Leave"],
    default: "Present",
  },
});

// Add an index for efficient queries on employeeId and date
AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true }); // Prevent duplicate attendance for the same employee on the same date

const Attendance = mongoose.model("Attendance", AttendanceSchema);
module.exports = Attendance;
