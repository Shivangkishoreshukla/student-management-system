const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM Instructors", (err, result) => {
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { instructorName } = req.body;

  db.query(
    "INSERT INTO Instructors (InstructorName) VALUES (?)",
    [instructorName],
    (err, result) => {
      res.json({ message: "Instructor added" });
    }
  );
});

module.exports = router;