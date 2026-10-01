const dns = require("dns");

// Use Google DNS for MongoDB Atlas SRV lookup
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Import routes
const employeeRoutes = require("./routes/employee");
const salaryRoutes = require("./routes/salary");
const leaveRoutes = require("./routes/leave");
const userRoutes = require("./routes/basicAuth");

// Routes
app.use("/employee", employeeRoutes);
app.use("/salary", salaryRoutes);
app.use("/leave", leaveRoutes);
app.use("/basicUser", userRoutes);

const port = 8000;

// Mongoose configuration
mongoose.set("strictQuery", true);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected!!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Payroll Management API is running",
  });
});
// Start server
app.listen(port, () => {
  console.log(`Backend is running on: ${port}`);
});
