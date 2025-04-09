import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Backend_Url from '../config/Backendurl';

const Userlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`${Backend_Url}user/userlogin`, {
        email,
        password,
      });
  
      const user = res.data.user;
  
      localStorage.setItem('userEmail', email);
  
      if (!user.assigned) {
        Swal.fire({
          icon: 'info',
          title: 'Not Assigned',
          text: 'You are not assigned to any tasks yet. Please contact admin.',
        }).then(() => {
          navigate('/userdashboard'); // Still navigate after showing alert
        });
      } else {
        Swal.fire({
          toast: true,
          position: 'top',
          icon: 'success',
          title: `Welcome, ${user.name}`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
  
        navigate('/userdashboard'); // Navigate normally
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid credentials',
      });
    }
  };
  

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg p-4 border-0 rounded-4">
            <Card.Body>
              <h3 className="text-center mb-4 fw-bold">User Login</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="dark" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Userlogin;
