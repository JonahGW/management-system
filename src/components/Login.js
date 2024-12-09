import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful", );
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form style={styles.form} onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
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
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #4caf50, #81c784)",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#2c3e50",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
  },
  submitButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  submitButtonHover: {
    opacity: "0.9",
  },
  error: {
    color: "#e74c3c",
    marginBottom: "10px",
    fontSize: "14px",
  },
  redirect: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#2c3e50",
  },
  link: {
    color: "#4caf50",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
  },
};

export default LoginPage;
