import React, { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

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

function App() {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="App">
      <LoginForm students={students} />
      <StudentForm onStudentAdded={fetchStudents} />
      <StudentList 
        students={students} 
        onStudentUpdated={fetchStudents} 
        onStudentDeleted={fetchStudents} 
      />
    </div>
  );
}

export default App;