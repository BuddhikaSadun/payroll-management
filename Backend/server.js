const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//import multer
var multer = require("multer");

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//import routes

const employeeRoutes = require("./routes/employee");

const salaryRoutes = require("./routes/salary");
/*const leaveRoutes = require("./routes/leave");
const userRoutes = require("./routes/basicAuth");
*/
app.use("/employee", employeeRoutes);
app.use("/salary", salaryRoutes);
/*app.use("/leave", leaveRoutes);
app.use("/basicUser", userRoutes);
*/
const port = 8000;

const url =
  "mongodb+srv://buddhikaSadun:sadun123@clusterdemo.aqzosav.mongodb.net/hospital_db?retryWrites=true&w=majority";

// Set the strictQuery option to prepare for future changes
mongoose.set("strictQuery", true);

//connect the database
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!!");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.Promise = global.Promise;

app.listen(port, () => {
  console.log(`Backend is running on: ${port}`);
});
