import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import Backend_Url from '../config/Backendurl';
import '../css/index.css';

function Header() {
  const navigate = useNavigate();

  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminClick = () => setShowAdminLogin(true);
  const handleClose = () => setShowAdminLogin(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Backend_Url}admin/adminlogin`, {
        adminid: adminId,
        password: adminPassword
      });

      localStorage.setItem('adminId', adminId);
      localStorage.setItem('adminPassword', adminPassword);

      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'success',
        title: `Welcome, ${res.data.admin.name}`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: { popup: 'tiny-toast' }
      });

      navigate('/admindashboard');
      setShowAdminLogin(false);
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: error.response?.data?.message || 'Invalid credentials!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: { popup: 'tiny-toast' }
      });
    }
  };

  return (
    <>
      <Navbar className="custom-navbar" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">📝 TaskManager Pro</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
            </Nav>
            <div className="d-flex gap-2">
              <Button as={Link} to="/userlogin" variant="outline-light" className="d-flex align-items-center gap-2">
                <FaUser /> User Login
              </Button>
              <Button onClick={handleAdminClick} variant="outline-warning" className="d-flex align-items-center gap-2">
                <FaUserShield /> Admin Login
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Admin Login Modal */}
      <Modal show={showAdminLogin} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdminSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Admin ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
                <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
