import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const isRootDashboard = location.pathname === '/admin';

  return (
    <div className="admin-dashboard-layout d-flex flex-column vh-100 bg-dark text-white">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center p-3 shadow-sm bg-black">
        <div className="d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
            alt="Admin"
            className="admin-logo me-3"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          <h5 className="mb-0">Welcome, <strong>{adminName}</strong> 👋</h5>
        </div>
        <Button variant="outline-light" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      {/* Main Section */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside className="sidebar bg-secondary d-flex flex-column p-4 shadow-sm" style={{ minWidth: '240px' }}>
          <h5 className="text-center mb-4">🛠️ Admin Panel</h5>
          <Nav className="flex-column gap-3">
            <Nav.Link as={Link} to="usercreation" className="text-white sidebar-link">
              👤 User Creation
            </Nav.Link>
           
            <Nav.Link as={Link} to="tasks" className="text-white sidebar-link">
              ✅ Tasks
            </Nav.Link>
            <Nav.Link as={Link} to="settings" className="text-white sidebar-link">
              ⚙️ Settings
            </Nav.Link>
          </Nav>
        </aside>

        {/* Content Area */}
        <main className="flex-grow-1 p-4 bg-light text-dark" style={{ overflowY: 'auto' }}>
          <Outlet />
          {isRootDashboard && (
            <div className="default-welcome text-center mt-5">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/admin-dashboard-5270262-4397133.png"
                alt="Dashboard"
                className="img-fluid mb-4"
                style={{ maxWidth: '300px' }}
              />
              <h3 className="fw-semibold">Welcome to the Admin Dashboard</h3>
              <p className="text-muted">Use the sidebar to navigate through different sections.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
