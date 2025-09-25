import React, { useState, useEffect } from "react";
import { decrypt, encrypt } from "../utils/crypto";

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

  const loggedInUser = localStorage.getItem("sessionUser");

  const deleteStudent = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(`http://localhost:5000/students/${id}`, { method: "DELETE" });
        if (response.ok) onStudentDeleted();
        else alert("Error deleting student.");
      } catch (error) {
        console.error(error);
        alert("Error deleting student.");
      }
    }
  };

  const startEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      fullName: decrypt(student.fullName),
      email: decrypt(student.email),
      phone: decrypt(student.phone),
      dob: decrypt(student.dob),
      gender: decrypt(student.gender),
      address: decrypt(student.address),
      course: decrypt(student.course),
      password: decrypt(student.password),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateStudent = async () => {
    if (!editingStudent) return;

    try {
      const encryptedData = {
        ...formData,
        password: encrypt(formData.password),
        fullName: encrypt(formData.fullName),
        email: encrypt(formData.email),
        phone: encrypt(formData.phone),
        dob: encrypt(formData.dob),
        gender: encrypt(formData.gender),
        address: encrypt(formData.address),
        course: encrypt(formData.course),
      };

      const response = await fetch(`http://localhost:5000/students/${editingStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(encryptedData),
      });

      if (response.ok) {
        setEditingStudent(null);
        onStudentUpdated();
      } else alert("Error updating student.");
    } catch (error) {
      console.error(error);
      alert("Error updating student.");
    }
  };

  if (!loggedInUser) {
    return <p>Please login to see the student list.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>Student List</h2>
      {students && students.length ? (
        <div style={{ maxWidth: "1700px", overflowX: "auto" }}>
          <table border={1}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Course</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{decrypt(s.fullName)}</td>
                  <td>{decrypt(s.email)}</td>
                  <td>{decrypt(s.phone)}</td>
                  <td>{decrypt(s.dob)}</td>
                  <td>{decrypt(s.gender)}</td>
                  <td>{decrypt(s.address)}</td>
                  <td>{decrypt(s.course)}</td>
                  <td>{decrypt(s.password)}</td>
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
          {["fullName","email","phone","dob","gender","address","course","password"].map((field) => (
            field === "gender" ? (
              <select key={field} name={field} value={formData.gender} onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <input
                key={field}
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleInputChange}
                placeholder={field}
              />
            )
          ))}
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
