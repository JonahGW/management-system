import React from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Introduction Section */}
      <header style={styles.header}>
        <h1>Welcome to Maize Millers Dashboard</h1>
        <p>
          Track and manage the weight of your maize bags with efficiency and precision.
        </p>
      </header>

      {/* Login and Register Buttons */}
      <div style={styles.actionContainer}>
        <button style={styles.actionButton} onClick={() => navigate("/login")}>
          Login
        </button>
        <button style={styles.actionButton} onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    marginBottom: "30px",
  },
  actionContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  actionButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "15px 30px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  actionButtonHover: {
    backgroundColor: "#218838",
  },
};

export default Homepage;
