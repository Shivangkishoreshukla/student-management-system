const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM Courses", (err, result) => {
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { courseName } = req.body;

  db.query(
    "INSERT INTO Courses (CourseName) VALUES (?)",
    [courseName],
    (err, result) => {
      res.json({ message: "Course added" });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM Courses WHERE CourseID=?",
    [req.params.id],
    (err, result) => {
      res.json({ message: "Course deleted" });
    }
  );
});

module.exports = router;