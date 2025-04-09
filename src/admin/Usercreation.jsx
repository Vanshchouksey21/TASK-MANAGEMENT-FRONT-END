import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

// Import your backend URL config
import Backend_Url from '../config/Backendurl';

const Usercreation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    console.log('Live Field Update:', name, '| Value:', value);
    console.log('Current Form Data:', updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        let api = `${Backend_Url}admin/usercreation`;
      const res = await axios.post(api, formData);
      console.log('✅ User Created Successfully:', res.data);

      // ✅ Show success alert
      Swal.fire({
        icon: 'success',
        title: 'User Created Successfully',
        text: `User ${formData.name} has been added.`,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top',
      });

      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        role: ''
      });
    } catch (err) {
      console.error('❌ Error Creating User:', err);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Create User',
        text: err.response?.data?.message || 'Something went wrong!',
        toast: true,
        timer: 3000,
        showConfirmButton: false,
        position: 'top'
      });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <h4 className="mb-4 text-center">Create New User</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select role</option>
                    <option value="designer">Designer</option>
                    <option value="programmer">Programmer</option>
                    <option value="tranee">Trainee</option>
                    <option value="intern">Intern</option>
                    <option value="team-leader">Team Leader</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Create User
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Usercreation;
