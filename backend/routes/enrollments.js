const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const sql = `
  SELECT e.EnrollmentID,
         s.Name AS Student,
         c.CourseName,
         e.EnrollmentDate
  FROM Enrollments e
  JOIN Students s ON e.StudentID = s.StudentID
  JOIN Courses c ON e.CourseID = c.CourseID
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

router.post("/", (req, res) => {

  const { studentId, courseId, enrollmentDate } = req.body;

  db.query(
    "INSERT INTO Enrollments (StudentID, CourseID, EnrollmentDate) VALUES (?, ?, ?)",
    [studentId, courseId, enrollmentDate],
    (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ message: "Enrollment created successfully" });

    }
  );

});

module.exports = router;