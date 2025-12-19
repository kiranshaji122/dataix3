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

    for (let role in dummyUsers) {
      const user = dummyUsers[role];
      if (user.username === username && user.password === password) {
        setRole(role);
        navigate(`/${role}`);
        return;
      }
    }

    setError("Invalid username or password");
  };

  // ✅ Style object defined inside the same file
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "80px auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    heading: {
      marginBottom: "20px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "15px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    error: {
      color: "red",
      marginTop: "10px",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}> Login</h2>

      <input
        style={styles.input}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={styles.button} onClick={handleLogin}>
        Login
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

export default Login;
