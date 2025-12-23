import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyUsers } from "../data/users";

function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    // STUDENT LOGIN
  
      const student = dummyUsers.students.find(u => u.username === username && u.password === password);
    if (student) {
      setRole("student");
      navigate("/student", { state: { student } });
      return;
    }

    // TRAINER LOGIN
       const trainer = dummyUsers.trainer.find(u => u.username === username && u.password === password);
    if (trainer) {
      setRole("trainer");
      navigate("/trainer", { state: { trainer } });
      return;
    }

    // ADMIN LOGIN
    if (
      username === dummyUsers.admin.username &&
      password === dummyUsers.admin.password
    ) {
      setRole("admin");
      navigate("/admin");
      return;
    }

    setError("Invalid username or password");
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input
        style={styles.input}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={styles.button} onClick={handleLogin}>
        Login
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    textAlign: "center",
    borderRadius: "8px",
    background: "#f4f4f4",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default Login;
