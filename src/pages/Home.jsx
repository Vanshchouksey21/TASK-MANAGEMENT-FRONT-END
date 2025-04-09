import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Backend_Url from '../config/Backendurl';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import '../css/index.css';

const Home = () => {
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
    <Container className="home-container text-light">
      <motion.h1
        className="text-center mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📝 Welcome to Task Management System
      </motion.h1>

      <p className="text-center mb-5 description-text">
        Manage your tasks effectively with separate panels for users and admins.
      </p>

      <Row className="gap-4 justify-content-center">
        <Col md={5}>
          <motion.div
            className="panel-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-3"><FaUser className="me-2" /> User Panel</h3>
            <p>Click below to login as a user and manage your assigned tasks efficiently.</p>
            <Button variant="primary" className="w-100" onClick={() => navigate('/userlogin')}>
              Login as User
            </Button>
          </motion.div>
        </Col>

        <Col md={5}>
          <motion.div
            className="panel-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="mb-3"><FaUserShield className="me-2" /> Admin Panel</h3>
            <p>Login as an admin to assign tasks, manage users, and monitor progress.</p>
            <Button variant="dark" className="w-100" onClick={handleAdminClick}>
              Login as Admin
            </Button>
          </motion.div>
        </Col>
      </Row>

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
    </Container>
  );
};

export default Home;
