import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateUser = async (userId, updatedData) => {
    try {
      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, updatedData);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      if (window.confirm("Are you sure you want to delete this user?")) {
        const userDoc = doc(db, "users", userId);
        await deleteDoc(userDoc);
        setUsers(users.filter((user) => user.id !== userId));
        alert("User deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleResetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <React.Fragment>
      <h1>Manage Users</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleUpdateUser(user.id, { role: e.target.value })
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleResetPassword(user.email)}>
                    Reset Password
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    style={{ backgroundColor: "red", color: "white", marginLeft: "5px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};

export default ManageUsers;
