import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home";
import Login from "./components/Login";
import Register from "./pages/Register";
import DashboardLayout from "./components/DashboardLayout"; // Dashboard with sidebar
import ManageUsers from "./pages/ManageUsers"; // Page rendered inside dashboard
import DisplayRecords from "./pages/DisplayRecords"; // Page rendered inside dashboard
import Reports from "./pages/Reports"; // Page rendered inside dashboard
import EditUser from "./pages/EditUser"; // Edit user

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-users/edit/:id" element={<EditUser />} />  {/* Edit user by ID */}
          <Route path="display-records" element={<DisplayRecords />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
