import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Student({ setRole }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const s = location.state?.student;

  // Handle logout with confirmation
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setIsLoggingOut(true);
      setTimeout(() => {
        setRole(null);
        navigate("/");
      }, 500);
    }
  };

  // Calculate progress percentage if it's a string like "75%"
  const getProgressValue = (progress) => {
    if (typeof progress === 'string' && progress.includes('%')) {
      return parseInt(progress) || 0;
    }
    return progress;
  };

  // Determine progress color based on value
  const getProgressColor = (value) => {
    if (value >= 80) return "#28a745";
    if (value >= 60) return "#17a2b8";
    if (value >= 40) return "#ffc107";
    return "#dc3545";
  };

  if (!s) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>⚠️</div>
          <h3>User Not Found</h3>
          <p>We couldn't retrieve your student information. Please try logging in again.</p>
          <button
            onClick={() => navigate("/")}
            style={styles.primaryButton}
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  const progressValue = getProgressValue(s.progress);
  const progressColor = getProgressColor(progressValue);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header with student info */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Student Dashboard</h2>
            <p style={styles.subtitle}>Welcome back, {s.name}!</p>
          </div>
          <div style={styles.avatar}>
            {s.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Student Info Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Profile Information</h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Student ID</span>
              <span style={styles.infoValue}>{s.id || "N/A"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Email</span>
              <span style={styles.infoValue}>{s.email || "Not provided"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Department</span>
              <span style={styles.infoValue}>{s.department || "General Studies"}</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Learning Progress</h3>
          <div style={styles.progressContainer}>
            <div style={styles.progressHeader}>
              <span>Overall Progress</span>
              <span style={{ fontWeight: "bold", color: progressColor }}>
                {s.progress}
              </span>
            </div>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${progressValue}%`,
                  backgroundColor: progressColor
                }}
              />
            </div>
            <div style={styles.progressHint}>
              {progressValue >= 80 
                ? "Excellent progress! Keep it up!" 
                : progressValue >= 60 
                ? "Good progress! You're on track."
                : "Keep working hard! You can do it!"}
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div style={styles.section}>
          <div style={styles.coursesHeader}>
            <h3 style={styles.sectionTitle}>Enrolled Courses</h3>
            <span style={styles.courseCount}>{s.courses?.length || 0} courses</span>
          </div>
          {s.courses && s.courses.length > 0 ? (
            <div style={styles.coursesGrid}>
              {s.courses.map((course, index) => (
                <div key={index} style={styles.courseCard}>
                  <div style={styles.courseIcon}>📚</div>
                  <div style={styles.courseName}>{course}</div>
                  <div style={styles.courseStatus}>
                    <span style={styles.statusDot} />
                    Active
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={styles.noCourses}>No courses enrolled yet.</p>
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
            {isLoggingOut && <span style={styles.spinner} />}
          </button>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <span style={styles.footerText}>
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: 800,
    margin: "30px auto",
    padding: "0 20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
    overflow: "hidden",
    transition: "transform 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #e9ecef",
  },
  title: {
    margin: 0,
    color: "#2c3e50",
    fontSize: "28px",
    fontWeight: 600,
  },
  subtitle: {
    margin: "5px 0 0",
    color: "#6c757d",
    fontSize: "16px",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: "#3498db",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    boxShadow: "0 4px 12px rgba(52, 152, 219, 0.3)",
  },
  section: {
    padding: "25px 30px",
    borderBottom: "1px solid #e9ecef",
  },
  sectionTitle: {
    margin: "0 0 20px",
    color: "#2c3e50",
    fontSize: "20px",
    fontWeight: 600,
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
  },
  infoLabel: {
    fontSize: "14px",
    color: "#6c757d",
    marginBottom: "5px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  infoValue: {
    fontSize: "16px",
    color: "#2c3e50",
    fontWeight: 500,
  },
  progressContainer: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "16px",
  },
  progressBar: {
    height: "10px",
    backgroundColor: "#e9ecef",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  progressFill: {
    height: "100%",
    borderRadius: "5px",
    transition: "width 0.5s ease",
  },
  progressHint: {
    fontSize: "14px",
    color: "#6c757d",
    fontStyle: "italic",
  },
  coursesHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  courseCount: {
    backgroundColor: "#e9ecef",
    padding: "5px 15px",
    borderRadius: "20px",
    fontSize: "14px",
    color: "#6c757d",
  },
  coursesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
  },
  courseCard: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  courseCardHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  courseIcon: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  courseName: {
    fontSize: "16px",
    fontWeight: 500,
    color: "#2c3e50",
    marginBottom: "5px",
  },
  courseStatus: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#6c757d",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#28a745",
    marginRight: "8px",
  },
  noCourses: {
    textAlign: "center",
    color: "#6c757d",
    fontStyle: "italic",
    padding: "20px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px 30px",
  },
  primaryButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
    transition: "all 0.3s ease",
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
    transition: "all 0.3s ease",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  footer: {
    padding: "15px 30px",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #e9ecef",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "#6c757d",
  },
  errorContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
  },
  errorCard: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "400px",
  },
  errorIcon: {
    fontSize: "48px",
    marginBottom: "20px",
  },
};

// Add CSS for spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default Student;