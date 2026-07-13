const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [];

// Get all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// Add student
app.post("/api/students", (req, res) => {
  const student = {
    id: Date.now(),
    ...req.body,
  };

  students.push(student);

  res.status(201).json(student);
});

// Update student
app.put("/api/students/:id", (req, res) => {
  students = students.map((student) => {
    if (student.id == req.params.id) {
      return {
        ...student,
        ...req.body,
      };
    }
    return student;
  });

  res.json({ message: "Student Updated Successfully" });
});

// Delete student
app.delete("/api/students/:id", (req, res) => {
  students = students.filter(
    (student) => student.id != req.params.id
  );

  res.json({ message: "Student Deleted Successfully" });
});

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});