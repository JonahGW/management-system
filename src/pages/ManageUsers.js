import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
} from "@mui/material";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newUser, setNewUser] = useState({
    Name: "",
    Email: "",
    Role: "",
    Organization: "",
    Password: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "Users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
    let password = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditData({ ...user });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      const usersCollection = collection(db, "Users");
      const userToAdd = {
        ...newUser,
        Password: newUser.Password || generatePassword(),
      };
      await addDoc(usersCollection, userToAdd);
      setNewUser({
        Name: "",
        Email: "",
        Role: "",
        Organization: "",
        Password: "",
      });
      setShowAddForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const userRef = doc(db, "Users", editUserId);
      await updateDoc(userRef, editData);
      setEditUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(db, "Users", userId));
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <h2 style={{ margin: 0, color: "#2c3e50" }}>Manage Users</h2>
        <Box display="flex" alignItems="center" style={{ flexGrow: 1, justifyContent: "center" }}>
          <TextField
            placeholder="Search users..."
            variant="outlined"
            size="small"
            style={{ width: "300px" }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel Add User" : "Add User"}
        </Button>
      </Box>

      {showAddForm && (
        <Box component="form" style={{ marginBottom: "20px" }}>
          <TextField
            label="Name"
            name="Name"
            value={newUser.Name}
            onChange={handleNewUserChange}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Email"
            name="Email"
            value={newUser.Email}
            onChange={handleNewUserChange}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Role"
            name="Role"
            value={newUser.Role}
            onChange={handleNewUserChange}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Organization"
            name="Organization"
            value={newUser.Organization}
            onChange={handleNewUserChange}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Password"
            name="Password"
            value={newUser.Password}
            onChange={handleNewUserChange}
            style={{ marginRight: "10px" }}
            placeholder="Leave blank to auto-generate"
          />
          <Button variant="contained" color="success" onClick={handleAddUser}>
            Add User
          </Button>
        </Box>
      )}

      {editUserId && (
        <Box component="form" style={{ marginBottom: "20px" }}>
          <h3>Edit User</h3>
          <TextField
            label="Name"
            name="Name"
            value={editData.Name}
            onChange={handleChange}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Email"
            name="Email"
            value={editData.Email}
            onChange={handleChange}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Role"
            name="Role"
            value={editData.Role}
            onChange={handleChange}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Organization"
            name="Organization"
            value={editData.Organization}
            onChange={handleChange}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Password"
            name="Password"
            value={editData.Password}
            onChange={handleChange}
            style={{ marginRight: "10px" }}
            placeholder="Leave blank to keep current"
          />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Organization</strong></TableCell>
              <TableCell><strong>Password</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.Name}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.Role}</TableCell>
                <TableCell>{user.Organization}</TableCell>
                <TableCell>{user.Password}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(user)}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="contained"
                    color="error"
                    size="small"
                    style={{ marginLeft: "5px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ManageUsers;
