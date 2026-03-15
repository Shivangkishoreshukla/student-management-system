const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM Students", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { name, dob, address } = req.body;
    console.log(req.body)
  db.query(
    "INSERT INTO Students (Name,DOB,Address) VALUES (?,?,?)",
    [name, dob, address],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Student added" });
    }
  );
});

router.put("/:id", (req, res) => {
  const {name, dob, address } = req.body;

  db.query(
    "UPDATE Students SET Name=?, DOB=?, Address=? WHERE StudentID=?",
    [name, dob, address, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Student updated" });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM Students WHERE StudentID=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Student deleted" });
    }
  );
});

module.exports = router;