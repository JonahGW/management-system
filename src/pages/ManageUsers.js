import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
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
    DriverName: "",
    TrackNo: "",
    Email: "",
    ID: "",
    Role: "",
    Timestamp: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "users", auth.currentUser.uid, "drivers");
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
      const usersCollection = collection(db, "users", auth.currentUser.uid, "drivers");
      const userToAdd = {
        ...newUser,
        Timestamp: new Date().toISOString(),
      };
      await addDoc(usersCollection, userToAdd);
      setNewUser({
        DriverName: "",
        TrackNo: "",
        Email: "",
        ID: "",
        Role: "",
        Timestamp: "",
      });
      setShowAddForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid, "drivers", editUserId);
      await updateDoc(userRef, editData);
      setEditUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid, "drivers", userId);
      await deleteDoc(userRef);
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
            label="Driver Name"
            name="DriverName"
            value={newUser.DriverName}
            onChange={handleNewUserChange}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Track No"
            name="TrackNo"
            value={newUser.TrackNo}
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
            label="ID"
            name="ID"
            value={newUser.ID}
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
          <Button variant="contained" color="success" onClick={handleAddUser}>
            Add User
          </Button>
        </Box>
      )}

      {editUserId && (
        <Box component="form" style={{ marginBottom: "20px" }}>
          <h3>Edit User</h3>
          <TextField
            label="Driver Name"
            name="DriverName"
            value={editData.DriverName}
            onChange={handleChange}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Track No"
            name="TrackNo"
            value={editData.TrackNo}
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
            label="ID"
            name="ID"
            value={editData.ID}
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
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Driver Name</strong></TableCell>
              <TableCell><strong>Track No</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.DriverName}</TableCell>
                <TableCell>{user.TrackNo}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.ID}</TableCell>
                <TableCell>{user.Role}</TableCell>
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
