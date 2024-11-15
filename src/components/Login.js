import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display error messages if login fails

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a login process (hardcoded credentials for demonstration)
    const validEmail = "user@example.com"; // Replace with your email validation
    const validPassword = "password123"; // Replace with your password validation

    if (email === validEmail && password === validPassword) {
      // If credentials are correct, redirect to the dashboard
      setError(""); // Clear any previous errors
      navigate("/dashboard");
    } else {
      // If login fails, display an error message
      setError("Invalid email or password.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.submitButton}>
            Login
          </button>
        </form>
        <p style={styles.redirect}>
          Don't have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    width: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  submitButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "15px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
  redirect: {
    marginTop: "20px",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default LoginPage;
