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
  const [loggedInUser, setLoggedInUser] = useState<string | null>(
    localStorage.getItem("sessionUser")
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const student = students.find((s) => decrypt(s.email) === email);

    if (student && decrypt(student.password) === password) {
      alert("Login successful!");
      localStorage.setItem("sessionUser", student.email);
      setLoggedInUser(student.email);
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionUser");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div>
        <h2>Welcome, {decrypt(loggedInUser)}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

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
