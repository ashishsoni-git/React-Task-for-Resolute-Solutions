import React, { useState } from "react";
import { encrypt } from "../utils/crypto";

interface StudentFormProps {
  onStudentAdded: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onStudentAdded }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    address: "",
    course: "",
    password: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          password: encrypt(form.password),
        }),
      });

      if (response.ok) {
        alert("Student added successfully!");
        setForm({
          fullName: "",
          email: "",
          phone: "",
          dob: "",
          gender: "Male",
          address: "",
          course: "",
          password: "",
        });
        onStudentAdded();
      } else {
        alert("Error adding student. Please try again.");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Student</h2>
      <div style={{ display: "flex", flexDirection: "column", width: "250px" }}>
        <input
          required
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          required
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          required
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          required
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
        />
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          required
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          required
          name="course"
          value={form.course}
          onChange={handleChange}
          placeholder="Course"
        />
        <input
          required
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add New Student"}
      </button>
    </form>
  );
};

export default StudentForm;