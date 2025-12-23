import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Trainer({ setRole }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const t = location.state?.trainer;

 const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setIsLoggingOut(true);
      setTimeout(() => {
        setRole(null);
        navigate("/");
      }, 500);
    }
  };

  if (!t) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>⚠️</div>
          <h3 style={styles.errorTitle}>Trainer Not Found</h3>
          <p style={styles.errorText}>Please login again to access the trainer dashboard.</p>
          <button
            onClick={() => navigate("/")}
            style={styles.returnButton}
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h2 style={styles.title}>Trainer Dashboard</h2>
          <p style={styles.subtitle}>Welcome, {t.name}!</p>
        </div>
        <div style={styles.trainerBadge}>
          <span style={styles.badgeIcon}>👨‍🏫</span>
          <span style={styles.badgeText}>Trainer</span>
        </div>
      </div>

      {/* Trainer Info Section */}
      <div style={styles.infoSection}>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Name</span>
          <span style={styles.infoValue}>{t.name}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Email</span>
          <span style={styles.infoValue}>{t.email || "trainer@example.com"}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Experience</span>
          <span style={styles.infoValue}>{t.experience || "5+ years"}</span>
        </div>
      </div>

      {/* Courses Section */}
      <div style={styles.coursesSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Courses Managed</h3>
          <span style={styles.courseCount}>{t.courses.length} courses</span>
        </div>
        {t.courses.length > 0 ? (
          <div style={styles.coursesList}>
            {t.courses.map((course, index) => (
              <div key={index} style={styles.courseItem}>
                <div style={styles.courseIcon}>📘</div>
                <div style={styles.courseContent}>
                  <span style={styles.courseName}>{course}</span>
                  
                </div>
                <div style={styles.courseActions}>
                 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noCourses}>
            <p style={styles.noCoursesText}>No courses assigned yet.</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={styles.actions}>
        
        <button
          onClick={handleLogout}
          style={{
            ...styles.logoutButton,
            opacity: isLoggingOut ? 0.7 : 1
          }}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f0f0f0",
  },
  
  titleSection: {
    flex: 1,
  },
  
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2d3748",
    margin: "0 0 8px 0",
  },
  
  subtitle: {
    fontSize: "16px",
    color: "#718096",
    margin: "0",
    fontWeight: "400",
  },
  
  trainerBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#e8f5e9",
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #c8e6c9",
  },
  
  badgeIcon: {
    fontSize: "20px",
  },
  
  badgeText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2e7d32",
  },
  
  infoSection: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
  },
  
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #e9ecef",
  },
 
  
  infoLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#495057",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  
  infoValue: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#212529",
  },
  
  coursesSection: {
    marginBottom: "30px",
  },
  
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#2d3748",
    margin: "0",
  },
  
  courseCount: {
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
    padding: "6px 14px",
    borderRadius: "16px",
    fontSize: "14px",
    fontWeight: "600",
  },
  
  coursesList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  
  courseItem: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
    transition: "all 0.2s ease",
  },
  
  courseItemHover: {
    backgroundColor: "#f1f3f4",
    transform: "translateY(-1px)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  
  courseIcon: {
    fontSize: "22px",
    marginRight: "16px",
  },
  
  courseContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  
  courseName: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#2d3748",
    marginBottom: "4px",
  },
  
  courseStatus: {
    fontSize: "13px",
    color: "#28a745",
    fontWeight: "500",
  },
  
  courseActions: {
    marginLeft: "16px",
  },
  
  viewButton: {
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  
  noCourses: {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
  },
  
  noCoursesText: {
    color: "#6c757d",
    fontSize: "16px",
    margin: "0",
    fontStyle: "italic",
  },
  
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20px",
    borderTop: "2px solid #f0f0f0",
  },
  
  secondaryButton: {
    backgroundColor: "#6c757d",
    color: "#ffffff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  
  logoutButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "12px 28px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    letterSpacing: "0.5px",
  },
  
  logoutButtonHover: {
    backgroundColor: "#218838",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
  },
  
  errorContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    padding: "20px",
  },
  
  errorCard: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
  },
  
  errorIcon: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  
  errorTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#dc3545",
    margin: "0 0 12px 0",
  },
  
  errorText: {
    fontSize: "16px",
    color: "#6c757d",
    margin: "0 0 24px 0",
    lineHeight: "1.5",
  },
  
  returnButton: {
    backgroundColor: "#007bff",
    color: "#ffffff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
};

export default Trainer;