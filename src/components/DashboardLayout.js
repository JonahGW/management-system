import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaUsers, FaClipboardList, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

function DashboardLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/"); // Redirect to login if the user is not authenticated
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Log out the user
      navigate("/"); // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Admin Dashboard</h2>
        <ul style={styles.menu}>
          <li style={styles.menuItem}>
            <NavLink
              to="manage-users"
              style={({ isActive }) => ({
                ...styles.link,
                backgroundColor: isActive ? "#34495e" : "transparent",
              })}
            >
              <FaUsers style={styles.icon} /> Manage Users
            </NavLink>
          </li>
          <li style={styles.menuItem}>
            <NavLink
              to="display-records"
              style={({ isActive }) => ({
                ...styles.link,
                backgroundColor: isActive ? "#34495e" : "transparent",
              })}
            >
              <FaClipboardList style={styles.icon} /> Display Records
            </NavLink>
          </li>
          <li style={styles.menuItem}>
            <NavLink
              to="reports"
              style={({ isActive }) => ({
                ...styles.link,
                backgroundColor: isActive ? "#34495e" : "transparent",
              })}
            >
              <FaChartBar style={styles.icon} /> Reports
            </NavLink>
          </li>
        </ul>

        {/* Footer links with icons */}
        <div style={styles.footer}>
          <NavLink
            to="settings"
            style={({ isActive }) => ({
              ...styles.link,
              backgroundColor: isActive ? "#34495e" : "transparent",
            })}
          >
            <FaCog style={styles.icon} /> Settings
          </NavLink>
          <button onClick={handleLogout} style={{ ...styles.link, ...styles.logoutButton }}>
            <FaSignOutAlt style={styles.icon} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <Outlet /> {/* Render nested routes dynamically */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
  },
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "20px",
    boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sidebarTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  menu: {
    listStyle: "none",
    padding: 0,
  },
  menuItem: {
    margin: "10px 0",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  icon: {
    color: "white",
  },
  footer: {
    marginTop: "auto",
  },
  mainContent: {
    padding: "20px",
    flex: "1",
    backgroundColor: "#ffffff",
  },
  logoutButton: {
    background: "none",
    border: "none",
    padding: "0",
    fontSize: "16px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    color: "white",
  },
};

export default DashboardLayout;
