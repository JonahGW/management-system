import React, { useState } from "react";
import { FaUserPlus, FaTrashAlt, FaEdit } from "react-icons/fa"; // Icons for actions

// Dummy data for users
const dummyUsers = [
  { id: 1, name: "Jerry Oloo", email: "jerry@example.com", role: "Admin" },
  { id: 2, name: "James Kanu", email: "james@example.com", role: "User" },
  { id: 3, name: "Tom Brown", email: "tom@example.com", role: "User" },
];

function ManageUsers() {
  const [users, setUsers] = useState(dummyUsers);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

  // Handle adding a new user
  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      const updatedUsers = [
        ...users,
        { id: users.length + 1, ...newUser },
      ];
      setUsers(updatedUsers);
      setNewUser({ name: "", email: "", role: "" }); // Reset form after adding
    }
  };

  // Handle deleting a user
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // Handle editing a user (basic example for now)
  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setNewUser({ name: userToEdit.name, email: userToEdit.email, role: userToEdit.role });
    handleDeleteUser(id); // Simulate editing by deleting and adding the user with updated data
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Users</h2>

      {/* Add new user form */}
      <div style={styles.formContainer}>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Name"
          style={styles.input}
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
          style={styles.input}
        />
        <input
          type="text"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          placeholder="Role"
          style={styles.input}
        />
        <button onClick={handleAddUser} style={styles.addButton}>
          <FaUserPlus /> Add User
        </button>
      </div>

      {/* List of users */}
      <div style={styles.usersList}>
        {users.map((user) => (
          <div key={user.id} style={styles.userCard}>
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <div style={styles.actions}>
              <button onClick={() => handleEditUser(user.id)} style={styles.editButton}>
                <FaEdit /> Edit
              </button>
              <button onClick={() => handleDeleteUser(user.id)} style={styles.deleteButton}>
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  formContainer: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    margin: "5px",
    width: "200px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    marginTop: "10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  usersList: {
    marginTop: "20px",
  },
  userCard: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  actions: {
    marginTop: "10px",
  },
  editButton: {
    backgroundColor: "#ff9800",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "10px",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default ManageUsers;
