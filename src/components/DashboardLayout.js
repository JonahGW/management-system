import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaUsers, FaClipboardList, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa"; // Import additional icons

function DashboardLayout() {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Admin Dashboard</h2>
        <ul style={styles.menu}>
          <li style={styles.menuItem}>
            <Link to="/manage-users" style={styles.link}>
              <FaUsers style={styles.icon} /> Manage Users
            </Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="/display-records" style={styles.link}>
              <FaClipboardList style={styles.icon} /> Display Records
            </Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="/reports" style={styles.link}>
              <FaChartBar style={styles.icon} /> Reports
            </Link>
          </li>
        </ul>

        {/* Footer links with icons */}
        <div style={styles.footer}>
          <Link to="/settings" style={styles.link}>
            <FaCog style={styles.icon} /> Settings
          </Link>
          <Link to="/logout" style={styles.link}>
            <FaSignOutAlt style={styles.icon} /> Logout
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.mainTitle}>Welcome to the Admin Dashboard</h1>

        {/* Cards Section */}
        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <FaUsers size={50} style={styles.cardIcon} />
            <h3>Manage Users</h3>
            <p>Create, update, or delete users in the system.</p>
          </div>
          <div style={styles.card}>
            <FaClipboardList size={50} style={styles.cardIcon} />
            <h3>Display Records</h3>
            <p>View and manage all recorded data.</p>
          </div>
          <div style={styles.card}>
            <FaChartBar size={50} style={styles.cardIcon} />
            <h3>Generate Reports</h3>
            <p>Generate and analyze reports based on system data.</p>
          </div>
        </div>

        <Outlet /> {/* Render nested routes like ManageUsers, DisplayRecords, etc. */}
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
    backgroundColor: "#2c3e50", // Darker background color for sidebar
    color: "white", // Text color for the sidebar
    padding: "20px",
    boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Ensures footer links stick to the bottom
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
    color: "white", // Ensures link text is white in the sidebar
    fontSize: "16px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    color: "white", // Icon color for links in sidebar
  },
  footer: {
    marginTop: "auto", // Pushes footer links to the bottom
  },
  mainContent: {
    padding: "20px",
    flex: "1",
    backgroundColor: "#ffffff",
  },
  mainTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "30%",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  cardIcon: {
    color: "#4CAF50",
    marginBottom: "10px",
  },
};

export default DashboardLayout;
