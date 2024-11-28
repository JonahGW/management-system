import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Perform registration logic here
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth,email, password);
      const user = userCredentials.user;
      console.log("Checkpoint");
      //Add user details in firestore
      const userDocRef = doc(db, 'Users',user.uid);
      await setDoc(userDocRef, {
        Email: user.email,
        Name: name,
        Role: role,
        Organization: organization,
        CreatedAt: new Date()
      });

      console.log("User added Successfully");
      navigate("/dashboard")
      
    }catch(error){
      alert(error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
  if (user) {
    const email = user.email;
    alert("Welcome to Momabsa Maize Millers Dashboard!");
    navigate("/dashboard");
  } 
  });
  }, []);
  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        <form  style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            style={styles.input}
            required
          />

        <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
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
          <button type="submit" onClick={handleSubmit} style={styles.submitButton}>
            Register
          </button>
        </form>
        <p style={styles.redirect}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/login")}
          >
            Login here
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

export default RegisterPage;
