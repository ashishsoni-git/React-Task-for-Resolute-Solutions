import React, { useState } from "react";
import { decrypt } from "../utils/crypto";

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

interface LoginFormProps {
  students: Student[];
}

const LoginForm: React.FC<LoginFormProps> = ({ students }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const student = students.find((s) => s.email === email);

    if (student && decrypt(student.password) === password) {
      alert("Login successful!");
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div style={{ display: "flex", flexDirection: "column", width: "250px" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;