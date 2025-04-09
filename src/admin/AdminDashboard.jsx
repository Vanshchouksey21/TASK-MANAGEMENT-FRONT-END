import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('adminId');
    if (!storedId) {
      navigate('/');
    } else {
      setAdminName(storedId);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminPassword');
    navigate('/');
  };

  return (
    <div className="admin-dashboard-layout">
      {/* Greeting Section */}
      <div className="greeting-section d-flex flex-column justify-content-center align-items-center text-white">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
          alt="Admin"
          className="admin-logo mb-2"
          style={{ width: '90px', borderRadius: '50%' }}
        />
        <h3 className="fw-semibold">Welcome, {adminName} 👋</h3>
        <Button variant="outline-light" size="sm" onClick={handleLogout} className="mt-2">
          Logout
        </Button>
      </div>

      {/* Main Section */}
      <div className="dashboard-main d-flex">
        {/* Sidebar */}
        <div className="sidebar bg-dark text-white p-4">
          <h5 className="text-center mb-4">Admin Panel</h5>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="usercreation" className="text-white nav-link-custom">
              👤 User Creation
            </Nav.Link>
            <Nav.Link as={Link} to="users" className="text-white nav-link-custom">
              📋 Users
            </Nav.Link>
            <Nav.Link as={Link} to="tasks" className="text-white nav-link-custom">
              ✅ Tasks
            </Nav.Link>
            <Nav.Link as={Link} to="settings" className="text-white nav-link-custom">
              ⚙️ Settings
            </Nav.Link>
          </Nav>
        </div>

        {/* Outlet content */}
        <div className="outlet-content p-4 w-100 bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
