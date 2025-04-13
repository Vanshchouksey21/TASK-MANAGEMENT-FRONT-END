import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
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
    try {
      const res = await axios.get(`${Backend_Url}admin/userdisplay`);
      setMyd(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    ld();
  }, []);

  const handleAssignClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setTask('');
    setTaskDesc('');
    setCompletionDate('');
  };

  const handleSubmit = async () => {
    if (!task || !taskDesc || !completionDate) {
      Swal.fire('Please fill all fields');
      return;
    }

    const payload = {
      userId: selectedUser._id,
      task,
      taskDesc,
      completionDate,
    };

    try {
      const res = await axios.post(`${Backend_Url}admin/assigntask`, payload);
      Swal.fire('✅ Task assigned successfully!');
      handleClose();
    } catch (err) {
      console.error(err);
      Swal.fire('❌ Error assigning task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action will delete the user!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete!',
        cancelButtonText: 'Cancel',
      });

      if (confirm.isConfirmed) {
        await axios.delete(`${Backend_Url}admin/deleteuser/${id}`);
        Swal.fire('✅ User deleted successfully!');
        ld();
      }
    } catch (err) {
      console.error(err);
      Swal.fire('❌ Error deleting user.');
    }
  };

  const checkAndShowTaskButtons = async (userId) => {
    try {
      const res = await axios.get(`${Backend_Url}admin/usertasks/${userId}`);
      const tasks = res.data;

      const latestCompleted = tasks
        .filter(t => t.isCompletedByUser && t.status === 'Pending')
        .pop();

      if (!latestCompleted) {
        Swal.fire('⚠️ No completed task waiting for verification.');
        return;
      }

      const result = await Swal.fire({
        title: 'Mark Task as:',
        showDenyButton: true,
        confirmButtonText: 'Correct ✅',
        denyButtonText: 'Not Correct ❌',
      });

      if (result.isConfirmed) {
        await axios.put(`${Backend_Url}admin/updatetaskstatus`, {
          taskId: latestCompleted._id,
          status: 'Correct',
        });
        Swal.fire('✅ Marked as Correct');
      } else if (result.isDenied) {
        await axios.put(`${Backend_Url}admin/updatetaskstatus`, {
          taskId: latestCompleted._id,
          status: 'Not Correct',
        });
        Swal.fire('❌ Marked as Not Correct');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('❌ Error fetching or updating task.');
    }
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
                <Button
                  variant="primary"
                  onClick={() => handleAssignClick(user)}
                  className="me-2 mb-1"
                >
                  ASSIGN TASK
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleDelete(user._id)}
                  className="me-2 mb-1"
                >
                  DELETE
                </Button>

                <Button
                  variant="info"
                  onClick={() => checkAndShowTaskButtons(user._id)}
                  className="mb-1"
                >
                  CHECK TASK
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
