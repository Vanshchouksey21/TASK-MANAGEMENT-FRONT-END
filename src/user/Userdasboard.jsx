import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="user-dashboard d-flex vh-100">
      {/* Sidebar */}
      <div className="sidebar bg-dark text-white p-3 d-flex flex-column" style={{ width: '240px' }}>
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User"
            style={{ width: '70px', borderRadius: '50%' }}
          />
          <h5 className="mt-3">{user.name}</h5>
          <p className="small">{user.email}</p>
        </div>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="mytasks" className="text-white sidebar-link">📋 My Tasks</Nav.Link>
          <Nav.Link as={Link} to="profile" className="text-white sidebar-link">👤 Profile</Nav.Link>
          <Nav.Link as={Link} to="settings" className="text-white sidebar-link">⚙️ Settings</Nav.Link>
        </Nav>
        <Button variant="outline-light" className="mt-auto" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Main content area */}
      <div className="flex-grow-1 p-4 bg-light overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
