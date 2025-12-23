import React, { useState } from "react";
import { dummyUsers } from "../data/users";
import { useNavigate } from "react-router-dom";

function Admin({ setRole }) {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const studentCount = dummyUsers.students?.length || 0;
  const trainerCount = dummyUsers.trainer ? 1 : 0; // trainer is a single object

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setIsLoggingOut(true);
      setTimeout(() => {
        setRole(null);
        navigate("/");
      }, 500);
    }
  };

  const styles = {
    container: {
      maxWidth: 650,
      margin: "50px auto",
      padding: 30,
      borderRadius: 10,
      backgroundColor: "#f9f9f9",
      boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    },
    heading: {
      textAlign: "center",
      marginBottom: 20,
      color: "#333",
    },
    card: {
      display: "flex",
      justifyContent: "space-around",
      marginBottom: 30,
    },
    statBox: {
      width: 200,
      padding: 20,
      textAlign: "center",
      borderRadius: 8,
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    },
    number: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#007bff",
    },
    label: {
      marginTop: 5,
      color: "#555",
    },
    button: {
      display: "block",
      margin: "0 auto",
      backgroundColor: "#dc3545",
      color: "#fff",
      padding: "10px 25px",
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      fontSize: 15,
      opacity: isLoggingOut ? 0.7 : 1,
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>

      <div style={styles.card}>
        <div style={styles.statBox}>
          <div style={styles.number}>{studentCount}</div>
          <div style={styles.label}>Students</div>
        </div>

        <div style={styles.statBox}>
          <div style={styles.number}>{trainerCount}</div>
          <div style={styles.label}>Trainers</div>
        </div>
      </div>

      <button
        style={styles.button}
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

export default Admin;
