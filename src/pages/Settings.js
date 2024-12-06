import React, { useState } from "react";
import {
  Container,
  Typography,
  Switch,
  TextField,
  Button,
  Avatar,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "Admin User",
    email: "admin@example.com",
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.style.backgroundColor = darkMode ? "#ffffff" : "#121212";
    document.body.style.color = darkMode ? "#000000" : "#ffffff";
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* Dark Mode Toggle */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography>Dark Mode</Typography>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </Box>

      {/* Notifications Toggle */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography>Enable Notifications</Typography>
        <Switch checked={notificationsEnabled} onChange={toggleNotifications} />
      </Box>

      {/* Profile Photo Upload */}
      <Box mb={3}>
        <Typography>Profile Photo</Typography>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              src={profilePhoto || "https://via.placeholder.com/150"}
              alt="Profile"
              sx={{ width: 80, height: 80 }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
            >
              Upload
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handlePhotoChange}
              />
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Edit User Details */}
      <Box mb={3}>
        <Typography>Edit Profile</Typography>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={userDetails.name}
          onChange={handleDetailChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={userDetails.email}
          onChange={handleDetailChange}
        />
      </Box>

      {/* Save Button */}
      <Box textAlign="center">
        <Button variant="contained" color="primary" onClick={saveSettings}>
          Save Settings
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
