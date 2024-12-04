import React from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Introduction Section */}
      <header style={styles.header}>
        <h1 style={styles.heading}>Welcome to Maize Millers Dashboard</h1>
        <p style={styles.subheading}>
          Track and manage the weight of your maize bags with efficiency and precision.
        </p>
      </header>

      {/* Action Buttons Section */}
      <div style={styles.actionContainer}>
        <div style={styles.buttonCard}>
          <button style={styles.actionButton} onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
        <div style={styles.buttonCard}>
          <button style={styles.actionButton} onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    padding: "40px 20px",
    textAlign: "center",
    backgroundColor: "#f3f8f8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundImage: "url('https://www.example.com/your-image.jpg')", // Example background image
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  header: {
    marginBottom: "40px",
    color: "#2c3e50",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  subheading: {
    fontSize: "18px",
    color: "#34495e",
    marginTop: "10px",
    lineHeight: "1.5",
  },
  actionContainer: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "30px",
  },
  buttonCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  actionButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "15px 30px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    width: "200px",
  },
  actionButtonHover: {
    backgroundColor: "#218838",
  },
};

export default Homepage;
