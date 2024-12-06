import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaUsers, FaClipboardList, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

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
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
  },
  profilePhoto: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  onlineDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    position: "absolute",
    bottom: "5px",
    right: "5px",
  },
  online: { backgroundColor: "green" },
  offline: { backgroundColor: "red" },
  footer: {
    marginTop: "auto",
  },
  mainContent: {
    padding: "20px",
    flex: "2",
    backgroundColor: "#ffffff",
    display: "flex",
  },
  defaultView: {
    textAlign: "center",
    color: "#34495e",
    width: "100%",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "40px",
    width: "80%",
    margin: "0 auto",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "250px",
    height: "250px",
    backgroundColor: "#ecf0f1",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    textAlign: "center",
  },
  cardIcon: {
    fontSize: "50px",
    marginBottom: "20px",
    color: "#2c3e50",
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

function DashboardLayout() {
  const [profilePhoto, setProfilePhoto] = useState(""); // Placeholder for profile photo URL
  const [isOnline, setIsOnline] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check Firebase auth state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsOnline(true);
        if (user.photoURL) {
          setProfilePhoto(user.photoURL);
        }
      } else {
        navigate("/");
      }
    });

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const isDashboardHome = location.pathname === "/dashboard";

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
              <FaUsers /> Manage Users
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
              <FaClipboardList /> Display Records
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
              <FaChartBar /> Reports
            </NavLink>
          </li>
        </ul>

        {/* Footer links with profile photo */}
        <div style={styles.footer}>
          <NavLink to="settings" style={styles.profileContainer}>
            <div style={{ position: "relative" }}>
              <img
                src={profilePhoto || "https://via.placeholder.com/40"} // Fallback image
                alt="Profile"
                style={styles.profilePhoto}
              />
              <div
                style={{
                  ...styles.onlineDot,
                  ...(isOnline ? styles.online : styles.offline),
                }}
              />
            </div>
            <span>Settings</span>
          </NavLink>
          <button onClick={handleLogout} style={styles.logoutButton}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {isDashboardHome ? (
          <div style={styles.defaultView}>
            <h1>Welcome to Admin Dashboard</h1>
            <div style={styles.cards}>
              <div
                style={styles.card}
                onClick={() => navigate("/dashboard/manage-users")}
              >
                <FaUsers style={styles.cardIcon} />
                <p>Manage Users</p>
              </div>
              <div
                style={styles.card}
                onClick={() => navigate("/dashboard/display-records")}
              >
                <FaClipboardList style={styles.cardIcon} />
                <p>Display Records</p>
              </div>
              <div
                style={styles.card}
                onClick={() => navigate("/dashboard/reports")}
              >
                <FaChartBar style={styles.cardIcon} />
                <p>Reports</p>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default DashboardLayout;
