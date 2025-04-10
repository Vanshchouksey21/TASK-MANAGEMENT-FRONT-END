import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Modal, Button, Form } from 'react-bootstrap';
import Backend_Url from '../config/Backendurl';

const Tasks = () => {
  const [myd, setMyd] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [task, setTask] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  // Load all users
  const ld = async () => {
    let api = `${Backend_Url}admin/userdisplay`;

    try {
      const res = await axios.get(api);
      setMyd(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ld();
  }, []);

  // When "Assign Task" button is clicked
  const handleAssignClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Close the modal
  const handleClose = () => {
    setShowModal(false);
    setTask('');
    setTaskDesc('');
    setCompletionDate('');
  };

  // Submit task to backend (if needed)
  const handleSubmit = async () => {
    if (!task || !taskDesc || !completionDate) {
      alert('Please fill all fields.');
      return;
    }

    const payload = {
      userId: selectedUser._id,
      task,
      taskDesc,
      completionDate,
    };

    console.log('Assigning Task:', payload);

    try {
      const res = await axios.post(`${Backend_Url}admin/assigntask`, payload);
      console.log(res.data);
      alert('Task assigned successfully!');
      handleClose();
    } catch (err) {
      console.error(err);
      alert('Error assigning task.');
    }

    handleClose(); // remove this if backend is connected
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">User List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {myd.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.password}</td>
              <td>
                <Button variant="primary" onClick={() => handleAssignClick(user)}>
                  ASSIGN TASK
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Task Assignment */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Task to {selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskInput" className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="taskDesc" className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description..."
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="completionDate" className="mb-3">
              <Form.Label>Completion Day</Form.Label>
              <Form.Control
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Assign Task
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Tasks;
