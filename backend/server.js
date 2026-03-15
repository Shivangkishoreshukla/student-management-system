require("dotenv").config();
const express = require("express");
const cors = require("cors");

const studentsRoutes = require("./routes/students");
const coursesRoutes = require("./routes/courses");
const subjectsRoutes = require("./routes/subjects");
const instructorsRoutes = require("./routes/instructors");
const enrollmentsRoutes = require("./routes/enrollments");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentsRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/instructors", instructorsRoutes);
app.use("/api/enrollments", enrollmentsRoutes);

app.get("/", (req, res) => {
  res.send("Student Management API Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});