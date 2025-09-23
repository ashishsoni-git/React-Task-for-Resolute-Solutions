import React, { useState } from "react";
import { encrypt } from "../utils/crypto";

interface Student {
  id: number;
  fullName: string;
  email: string;
  phone: string; 
  dob: string;
  gender: string;
  address: string;
  course: string;
  password: string;
}

interface StudentListProps {
  students: Student[];
  onStudentUpdated: () => void;
  onStudentDeleted: () => void;
}

const StudentList: React.FC<StudentListProps> = ({ 
  students, 
  onStudentUpdated, 
  onStudentDeleted 
}) => {
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    address: "",
    course: "",
    password: "",
  });

  const deleteStudent = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(`http://localhost:5000/students/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          onStudentDeleted();
        } else {
          alert("Error deleting student. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Error deleting student. Please try again.");
      }
    }
  };

  const startEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      dob: student.dob,
      gender: student.gender,
      address: student.address,
      course: student.course,
      password: student.password,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateStudent = async () => {
    if (!editingStudent) return;
    
    try {
      const response = await fetch(
        `http://localhost:5000/students/${editingStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            password: encrypt(formData.password),
          }),
        }
      );

      if (response.ok) {
        setEditingStudent(null);
        onStudentUpdated();
      } else {
        alert("Error updating student. Please try again.");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>Student List</h2>
      {students && students.length >= 1 ? (
        <div style={{maxWidth:"1700px", overflowX:"auto"}}>
          <table border={1}>
          <thead>
            <tr>
              <th>Encrypted Full Name</th>
              <th>Encrypted Email</th>
              <th>Encrypted Phone Number</th>
              <th>Encrypted Date of Birth</th>
              <th>Encrypted Gender</th>
              <th>Encrypted Address</th>
              <th>Encrypted Course</th>
              <th>Encrypted Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.fullName}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.dob}</td>
                <td>{s.gender}</td>
                <td>{s.address}</td>
                <td>{s.course}</td>
                <td>{s.password}</td>
                <td>
                  <button onClick={() => deleteStudent(s.id)}>Delete</button>
                  <button onClick={() => startEdit(s)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <p>No students found. Add a student to get started!</p>
      )}

      {editingStudent && (
        <div style={{ display: "flex", flexDirection: "column", width: "250px" }}>
          <h3>Edit Student</h3>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            placeholder="Course"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          <div>
            <button onClick={updateStudent}>Save</button>
            <button onClick={() => setEditingStudent(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;