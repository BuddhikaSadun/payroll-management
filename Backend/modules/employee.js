const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  img: {
    type: String,
  },
  personalDetails: {
    name: {
      type: String,
    },
    email: { type: String, required: true },
    contactNo: {
      type: String,
    },
  },
  employmentDetails: {
    status: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      required: true,
    },
    workSchedule: { type: String }, // e.g., '9 AM - 5 PM'
    dept: {
      type: String,
    },
    designation: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Employee", profileSchema);
