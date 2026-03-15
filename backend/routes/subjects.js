const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM Subjects", (err, result) => {
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { subjectName } = req.body;

  db.query(
    "INSERT INTO Subjects (SubjectName) VALUES (?)",
    [subjectName],
    (err, result) => {
      res.json({ message: "Subject added" });
    }
  );
});

module.exports = router;