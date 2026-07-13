import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add or Update Student
  const handleSubmit = async () => {
    if (!name || !department || !year) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/students/${editId}`, {
          name,
          department,
          year,
        });

        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/students", {
          name,
          department,
          year,
        });
      }

      setName("");
      setDepartment("");
      setYear("");

      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Student
  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  // Edit Student
  const editStudent = (student) => {
    setName(student.name);
    setDepartment(student.department);
    setYear(student.year);

    setEditId(student.id);
    setIsEditing(true);
  };

  return (
    <div className="container">
      <h1>🎓 Student Management System</h1>

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {isEditing ? "Update Student" : "Add Student"}
      </button>

      <hr />

      {students.length === 0 ? (
        <p>No Students Found</p>
      ) : (
        students.map((student) => (
          <div className="card" key={student.id}>
            <h3>{student.name}</h3>
            <p>
              <strong>Department:</strong> {student.department}
            </p>
            <p>
              <strong>Year:</strong> {student.year}
            </p>

            <button onClick={() => editStudent(student)}>Edit</button>

            <button
              onClick={() => deleteStudent(student.id)}
              style={{ marginLeft: "10px", background: "red", color: "white" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;